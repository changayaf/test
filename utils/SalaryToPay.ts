const MultiplySalary = ((hours: number, minutes: number, salaryHours: number , multiply: number): number =>{
    const totalSalaryHours: number = hours * salaryHours * multiply;
    const totalSalaryMinutes: number = (minutes*salaryHours)/60*multiply;
    const totalSalary: number = totalSalaryHours+totalSalaryMinutes;
    return Number(Math.round(totalSalary + 'e' + 2) + 'e-' + 2);
})

const HoursToPay = ((startTime: String, endTime: String): Array<number> =>{
    const startTimeArray: Array<string> = startTime.split(":");
    const endTimeArray: Array<string> = endTime.split(":");
    const startTimeHours: number = parseInt(startTimeArray[0]) ;
    const endTimeHours: number = parseInt(endTimeArray[0]);
    const startTimeMinutes: number = parseInt(startTimeArray[1]);
    const endTimeMinutes: number = parseInt(endTimeArray[1]);


    let normalHours: number = 0;
    let normalMinutes: number = 0;
    let extraHours: number = 0;
    let extraMinutes: number = 0;

    if(startTimeHours < 8){
        extraHours = 8 - startTimeHours;
        extraMinutes = startTimeMinutes;
    } else {
        normalHours = startTimeHours - 8;
        normalMinutes = startTimeMinutes;
    }
    if(endTimeHours < 18){
        normalHours = (18 - endTimeHours) + normalHours;
        normalMinutes = endTimeMinutes + normalMinutes;        
    } else {
        extraHours = (endTimeHours - 18) + extraHours;
        extraMinutes = endTimeMinutes + extraMinutes;
    }

    if(normalMinutes >= 60){
        normalHours =+ 1;
        normalMinutes =- 60;
    }
    
    if(extraMinutes >= 60){
        extraHours += 1;
        extraMinutes -= 60;
    }
    if(normalMinutes !== 0){
        normalHours += 1;
        normalMinutes = 60 - normalMinutes;
    }

    return [(10-normalHours), normalMinutes, extraHours,extraMinutes];
})

const SalaryToPay = ((startTime: String, endTime: String, salaryHours: number , multiply: number): number =>{
    const hoursToPay: Array<number> = HoursToPay(startTime, endTime);
    const totalSalaryNormal: number = MultiplySalary(hoursToPay[0],hoursToPay[1],salaryHours,1);
    const totalSalaryExtra: number = MultiplySalary(hoursToPay[2],hoursToPay[3],salaryHours,multiply);
    const totalSalaryDay: number = totalSalaryNormal + totalSalaryExtra;
    return Number(Math.round((totalSalaryDay) + 'e' + 2) + 'e-' + 2);
});

export default SalaryToPay;