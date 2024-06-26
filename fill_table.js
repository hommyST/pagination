const tbody = document.querySelector('tbody')

fill_table()

function fill_table() {
  DATA.forEach(row => {
    const tr = document.createElement('tr')
    const nameTd = document.createElement('td')
    const devsTd = document.createElement('td')
    const dateTd = document.createElement('td')
    const user_scoreTd = document.createElement('td')
    const platformsTd = document.createElement('td')


    nameTd.innerText = row.name
    devsTd.innerText = row.devs.join(', ')
    dateTd.innerText = row.date
    user_scoreTd.innerText = row.user_score
    platformsTd.innerText = row.platforms.join(', ')

    tr.append(nameTd, devsTd, dateTd, user_scoreTd, platformsTd)
    tbody.append(tr)
  })
}