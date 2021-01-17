let lang = "hr";

const year = 2021;
const weekdays = {
  hr: "pon uto sri čet pet sub ned".split(" "),
  en: "Mon Tue Wed Thu Fri Sat Sun".split(" ")
};
const monthNames = {
  hr: {5: "svibanj / maj", 6: "lipanj / jun", 7: "srpanj / juli", 8: "kolovoz / august", 9: "rujan / septembar"},
  en: {5: "May", 6: "June", 7: "July", 8: "August", 9: "September"}
};

function weekStarts(month) {
  const result = [];
  let d = dayjs([year, month, 1]).startOf('week').add(1, 'day');
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
  for (let m = 5; m <= 9; m++)
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
      result += `<td class="itemCellGlow">${label}</td>`;
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
