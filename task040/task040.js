function calendar() {


	this.thisMonth = {}
	this.lastMonth = {}
	this.nextMonth = {}

	this.getToday = function() {
		var today = new Date(),
			year,
			month,
			week,
			day;

		year = today.getFullYear();
		month = today.getMonth() + 1;
		day = today.getDate();
		week = today.getDay();

		this.thisMonth.year = year;
		this.thisMonth.month = month;
		this.thisMonth.week = week;
		this.thisMonth.day = day;
		this.thisMonth.firstDay = this.getFirstDay(day, week);

	}

	this.judgeMonthAndYear = function(month, year) {

		var monthdays,
			runYear,
			monthJudge;

		monthJudge = new RegExp(month);
		monthdays = (monthJudge.test([4, 6, 9, 11]) ? 30 : 31);
		monthdays = (monthJudge.test([2]) ? 28 : monthdays);

		if (year % 4 === 0) {
			if (!year % 100 === 0) {
				runYear = 1;
			} else {
				runYear = ((year % 400 === 0) ? 1 : 0);
			}
		}

		return {
			monthdays: monthdays,
			runYear: runYear
		}
	}

	this.getFirstDay = function(day, week) {

		var firstDay;

		firstDay = (((day - week - 1) % 7) === 0 ? 0 : 7 - ((day - week - 1) % 7));

		return (firstDay);
	}

	this.getLastDay = function(day, week, monthdays) {
		var lastDay,
			temp;

		temp = week + (monthdays - day) % 7;
		lastDay = (temp < 7 ? temp : temp - 7);

		return lastDay;
	}



	this.dealday = function() {

		var year,
			month,
			week,
			day,
			monthAndYear,
			nextMonthJudge,
			lastMonthJudge,
			lastMonth = {},
			nextMonth = {},
			temp;

		this.getToday();

		year = this.thisMonth.year;
		month = this.thisMonth.month;
		week = this.thisMonth.week;
		day = this.thisMonth.day;
		monthAndYear = this.judgeMonthAndYear(month, year);

		this.thisMonth.monthdays = monthAndYear.monthdays;
		this.thisMonth.runYear = monthAndYear.runYear;
		this.thisMonth.lastDay = this.getLastDay(day, week, this.thisMonth.monthdays);
		console.log(this.thisMonth);

		if (month === 1) {

			lastMonth.year = year - 1;
			lastMonth.month = 12;

		} else if (month === 12) {

			nextMonth.year = year + 1;
			nextMonth.month = 1;

		} else {

			lastMonth.year = year;
			lastMonth.month = month - 1;
			nextMonth.year = year;
			nextMonth.month = month + 1;

		}

		lastMonthJudge = this.judgeMonthAndYear(lastMonth.month, lastMonth.year);
		nextMonthJudge = this.judgeMonthAndYear(nextMonth.month, nextMonth.year);

		lastMonth.monthdays = lastMonthJudge.monthdays;
		lastMonth.runYear = lastMonthJudge.runYear;
		nextMonth.monthdays = nextMonthJudge.monthdays;
		nextMonth.runYear = nextMonthJudge.runYear;

		//temp = this.getFirstDay(this.thisMonth.day, this.thisMonth.week) - 1;

		lastMonth.week = this.getFirstDay(lastMonth.monthdays, this.thisMonth.firstDay - 1);
		lastMonth.day = 1;
		lastMonth.firstDay = lastMonth.week;
		lastMonth.lastDay = this.getLastDay(1, lastMonth.week, lastMonth.monthdays);

		//temp = this.getFirstDay(this.thisMonth.day, this.thisMonth.week) - 1;

		nextMonth.week = (this.thisMonth.lastDay + 1 < 7 ? this.thisMonth.lastDay + 1 : this.thisMonth.lastDay - 7);
		nextMonth.day = 1;
		nextMonth.firstDay = nextMonth.week;
		nextMonth.lastDay = this.getLastDay(1, nextMonth.week, nextMonth.monthdays);



		this.lastMonth = lastMonth;
		this.nextMonth = nextMonth;

		console.log(this.lastMonth);
		console.log(this.nextMonth);
	}

	this.render = function(whichMonth) {

		var calendarMatrix = [],
			week,
			day = 1,
			temp;

		for (var i = 0; i < 5; i++) {
			calendarMatrix[i] = [];
		}

		week = whichMonth.firstDay;

		for (var i = 0; i < 5; i++) {

			while (week < 7 && day < whichMonth.monthdays + 1) {
				calendarMatrix[i][week] = day;
				week++;
				day++;
			}

			week = 0;
		}

		console.log(calendarMatrix);



	}


}



var calendar = new calendar();

calendar.dealday();
var b = calendar.thisMonth;
calendar.render(calendar.nextMonth);

//console.log(calendar.getLastDay(25, 6, 30));

//console.log(b);
//console.log("aaa");