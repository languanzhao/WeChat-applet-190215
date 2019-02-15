const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Page({
  data: {
    years,
    year: date.getFullYear(),
    months,
    month:"",
    days,
    day:"",
    value: [9999, 1, 1],
  },
	onShow:function(){
		var date = new Date()
		var year = date.getFullYear()
		var month = date.getMonth()+1
		var day = date.getDate()
		console.log(year)
		console.log(month)
		console.log(day)
		var arr = [year,month-1,day-1]
		this.setData({
			value:arr,
			year:year,
			month:month,
			day:day
			})
	},
  bindChange(e) {
    const val = e.detail.value
		console.log(val)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]]
    })
  }
})