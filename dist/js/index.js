function getRowHighlight(severity){
    if(severity == 'critical') {
        return ' class="table-danger"';
    } else if(severity == 'major') {
        return ' class="table-warning"';
    } else if(severity == 'minor') {
        return ' class="table-info"';
    } else if(severity == 'blocker') {
        return ' class="table-primary"';
    }
    return '';
}

$('#role-select').change((event) => {
    let role = event.target.value;
    if(role in reports){
        let table = "";
        reports[role].forEach((issue, idx) => {
            let path = role + issue['location']['path'].split(role).slice(1).join('')
            table += `<tr><th scope="row">${idx}</th><td${getRowHighlight(issue['severity'])}>${issue['severity']}</td><td>${issue['description'].replace(/``/g,'<code>')}</td><td>${path}</td></tr>`
        });;
        console.log(table)
        $('#issues-table').html(table);
    }
});

$(document).ready(function() {
    let cardHeight = $('div.card').outerHeight(true);
    $('table.table thead').css('top', `${cardHeight}px`);
});