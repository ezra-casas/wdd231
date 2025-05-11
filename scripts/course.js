// course.js
const courses = [
  {
    code: "CSE 110",
    name: "Intro to Programming",
    credits: 3,
    completed: true,
  },
  { code: "WDD 130", name: "Web Fundamentals", credits: 3, completed: true },
  {
    code: "CSE 111",
    name: "Programming with Functions",
    credits: 3,
    completed: true,
  },
  {
    code: "CSE 210",
    name: "Programming Structures",
    credits: 3,
    completed: false,
  },
  {
    code: "WDD 131",
    name: "Dynamic Web Fundamentals",
    credits: 3,
    completed: true,
  },
  {
    code: "WDD 231",
    name: "Front-end Development",
    credits: 3,
    completed: false,
  },
];

function renderCourses(filter) {
  const courseContainer = document.getElementById("courses");
  courseContainer.innerHTML = "";

  const filtered =
    filter === "all"
      ? courses
      : courses.filter((course) => course.code.startsWith(filter));

  let totalCredits = 0;

  filtered.forEach((course) => {
    const div = document.createElement("div");
    div.className = "course-card" + (course.completed ? " completed" : "");
    div.textContent = `${course.code}: ${course.name}`;
    courseContainer.appendChild(div);

    totalCredits += course.credits;
  });

  document.getElementById("totalCredits").textContent = totalCredits;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCourses("all");

  document.querySelectorAll("#filter-buttons button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;
      renderCourses(filter);
    });
  });
});
