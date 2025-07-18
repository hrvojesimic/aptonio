let lang = "hr";

const year = 2025;
const weekdays = {
  hr: "pon uto sri čet pet sub ned".split(" "),
  en: "Mon Tue Wed Thu Fri Sat Sun".split(" ")
};
const monthNames = {
  hr: {5: "svibanj / maj", 6: "lipanj / jun", 7: "srpanj / juli", 8: "kolovoz / august", 9: "rujan / septembar", 10: "listopad / oktobar"},
  en: {5: "May", 6: "June", 7: "July", 8: "August", 9: "September", 10: "October"}
};
const reservations = [
  ["2025-06-04", "2025-06-28"], // Tino
  ["2025-06-28", "2025-07-05"], // Tokić
  ["2025-07-06", "2025-07-13"], // Sejla Uscuplic-Hasanovic
  ["2025-07-14", "2025-07-20"], // 
  ["2025-07-21", "2025-07-26"], // Ahmetović
  ["2025-07-27", "2025-08-01"], // 
  ["2025-08-02", "2025-08-15"], // mi
  ["2025-08-15", "2025-08-25"], // Milica Ševa
  ["2025-09-06", "2025-09-13"], // 
];

function occupied(date) {
  for (let period of reservations) {
    const start = dayjs(period[0]);
    const end = dayjs(period[1]);
    if (date.isSame(start) || date.isAfter(start))
      if (date.isSame(end) || date.isBefore(end))
        return true;
  }
  return false;
}

function weekStarts(month) {
  const result = [];
  let d = dayjs([year, month, 1]).startOf('isoWeek');
  while (d.month()+1 <= month) {
    result.push(d);
    d = d.add(7, 'days');
  }
  return result;
}

function calendar() {
  return `<table class="mainTable" style="margin-left: auto; margin-right: auto"><tbody>
    ${months()}
  </tbody></table>`;
}

function months() {
  let result = "";
  for (let m = 7; m <= 10; m++)
    result += monthRows(m);
  return result;
}

function monthRows(m) {
  let result = header(m);
  for (let weekStart of weekStarts(m)) {
    result += "<tr>";
    for (let d = 0; d < 7; d++) {
      const date = weekStart.add(d, 'days');
      const label = (date.month()+1 == m)? date.date() : "";
      const occupiedClass = occupied(date)? "itemCellOff" : "itemCellGlow";
      result += `<td class="${occupiedClass}">${label}</td>`;
    }
    result += "</tr>";
  }
  return result;
}

function header(m) {
  let result = `<tr><td colspan="7" class="monthHead">${monthNames[lang][m]} ${year}</td></tr><tr>`;
  for (let weekday of weekdays[lang])
    result += `<td class="dowHead">${weekday}</td>`;
  return result + "</tr>";
}

function swapTranslationsTo(l2) {
  const nodes = document.querySelectorAll("[" + l2 + "]");
  for (let node of nodes) {
    node.setAttribute(lang, node.innerHTML);
    node.innerHTML = node.getAttribute(l2);
  }
  lang = l2;
  loadCalendar();
}

function loadCalendar() {
  document.getElementById("AvailabilityCalendar").innerHTML = calendar();
}
