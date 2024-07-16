#! /usr/bin/env node 
import inquirer from "inquirer";
const randomNumber = Math.floor(10000 + Math.random() * 90000);
let myBalance = 0;
let studentName = "";
let enrolledCourses = [];
async function getStudentName() {
    let answer = await inquirer.prompt([
        {
            name: "Students",
            type: "input",
            message: "Enter Student name:",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty Value";
            },
        },
    ]);
    studentName = answer.Students;
}
async function selectCourse() {
    const availableCourses = ["Html", "CSS", "Javascript", "Python"].filter(course => !enrolledCourses.includes(course));
    if (availableCourses.length === 0) {
        console.log("\nAll courses have been enrolled. Exiting Student Management System.\n");
        return;
    }
    let answer = await inquirer.prompt([
        {
            name: "Courses",
            type: "list",
            message: "Select the course to enroll in:",
            choices: availableCourses,
        },
    ]);
    const tuitionFee = {
        "Html": 2000,
        "CSS": 4000,
        "Javascript": 6000,
        "Python": 10000,
    };
    console.log(`\nTuition Fees: ${tuitionFee[answer.Courses]}\n`);
    console.log(`Balance: ${myBalance}\n`);
    let paymentType = await inquirer.prompt([
        {
            name: "payment",
            type: "list",
            message: "Select the payment type",
            choices: ["Bank Transfer", "Easypaisa", "Jazzcash"],
        },
        {
            name: "amount",
            type: "input",
            message: "Enter the amount of money:",
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty Value";
            },
        },
    ]);
    console.log(`\nYou selected payment method: ${paymentType.payment}\n`);
    const tutionFees = tuitionFee[answer.Courses];
    const paymentAmount = parseFloat(paymentType.amount);
    if (paymentAmount >= tutionFees) {
        console.log(`\nCongratulations, you have successfully enrolled in ${answer.Courses}\n`);
        myBalance = paymentAmount - tutionFees;
        enrolledCourses.push(answer.Courses);
        if (paymentAmount > tutionFees) {
            console.log(`You have paid ${paymentAmount} and your balance is ${myBalance}`);
        }
        else {
            console.log("Payment successful");
        }
        let ans = await inquirer.prompt([
            {
                name: "select",
                type: "list",
                message: "What would you like to do next?",
                choices: ["View Status", "Enroll in another course", "Exit"],
            },
        ]);
        if (ans.select === "View Status") {
            console.log("\n***** Status *****\n");
            console.log(`Student Name: ${studentName}`);
            console.log(`Student ID: ${randomNumber}`);
            console.log(`Courses Enrolled: ${enrolledCourses.join(", ")}`);
            console.log(`Tuition Fees Paid: ${paymentAmount}`);
            console.log(`Balance: ${myBalance}`);
        }
        else if (ans.select === "Enroll in another course") {
            await selectCourse(); // Recursive call to allow selecting another course
        }
        else {
            console.log("\nExiting Student Management System");
        }
    }
    else {
        console.log(`\nInvalid amount for the course\n`);
        myBalance = 0;
    }
}
// Start the course selection process
await getStudentName();
await selectCourse();
