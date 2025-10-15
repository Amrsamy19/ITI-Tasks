let db;
const addBtn = document.getElementById("add-btn");
const notifyBtn = document.getElementById("notify-btn");
const taskRequest = indexedDB.open("tasks-db", 1);
const taskList = document.getElementById("task-list");
const timers = new Map();

notifyBtn.addEventListener("click", () => {
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      new Notification("Already granted", {
        body: "You have already granted the permission",
      });
    } else {
      alert("You denied the notification permission");
    }
  });
});

taskRequest.onupgradeneeded = (event) => {
  db = event.target.result;
  db.createObjectStore("tasks", { keyPath: "title" });
};

taskRequest.onsuccess = (event) => {
  db = event.target.result;
  showTasks();
};

taskRequest.onerror = (event) => {
  console.error("Database error: ", event.target.errorCode);
};

addBtn.addEventListener("click", () => {
  const title = document.getElementById("title").value.trim();
  const hours = parseInt(document.getElementById("hour").value);
  const minutes = parseInt(document.getElementById("minutes").value);

  if (!title) {
    alert("Please fill all fields correctly!");
    return;
  }

  const transaction = db.transaction(["tasks"], "readwrite");
  const objectStore = transaction.objectStore("tasks");
  const request = objectStore.add({ title, hours, minutes });

  request.onsuccess = () => {
    scheduleNotification(title, hours, minutes);
    showTasks();
  };

  request.onerror = (event) => {
    console.error("Error adding task:", event.target.error);
  };
});

function scheduleNotification(title, hours, minutes) {
  const now = new Date();
  const scheduled = new Date();
  if (hours) {
    scheduled.setHours(now.getHours() + parseInt(hours, 10));
  } else if (minutes) {
    scheduled.setMinutes(now.getMinutes() + parseInt(minutes, 10));
  } else if (!hours && !minutes) {
    scheduled.setHours(
      now.getHours() + parseInt(hours, 10),
      now.getMinutes() + parseInt(minutes, 10),
      0,
      0
    );
  }

  const delay = scheduled.getTime() - now.getTime();
  console.log(`⏰ Task "${title}" will notify in ${Math.round(delay / 1000)}s`);

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }

  const timeoutId = setTimeout(() => {
    if (Notification.permission === "granted") {
      new Notification("Task Reminder", {
        body: `It's time for: "${title}"`,
      });
      timers.get(title).isFired = true;
      document.getElementById(title).style.textDecoration = "line-through";
    }
    timers.delete(title);
  }, delay);

  timers.set(title, { timerId: timeoutId, isFired: false });
}

function deleteTask(title) {
  const transaction = db.transaction(["tasks"], "readwrite");
  const objectStore = transaction.objectStore("tasks");
  const request = objectStore.delete(title);

  request.onsuccess = () => {
    showTasks();
    if (timers.has(title)) {
      clearTimeout(timers.get(title));
      timers.delete(title);
    }
  };

  request.onerror = (event) => {
    console.error("Error deleting task:", event.target.error);
  };
}

function showTasks() {
  taskList.innerHTML = "";

  const transaction = db.transaction(["tasks"], "readonly");
  const objectStore = transaction.objectStore("tasks");
  const request = objectStore.getAll();

  request.onsuccess = (event) => {
    const tasks = event.target.result;

    if (tasks.length === 0) {
      taskList.innerHTML = "<li>No tasks yet.</li>";
      return;
    }

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.id = task.title;
      li.textContent = `${task.title} will fire in ${task.hours || 0} Hours:${
        task.minutes || 0
      } Minutes`;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.style.marginLeft = "10px";
      delBtn.addEventListener("click", () => deleteTask(task.title));

      li.appendChild(delBtn);
      taskList.appendChild(li);

      if (!timers.has(task.title)) {
        scheduleNotification(task.title, task.hours, task.minutes);
      }
    });
  };
}
