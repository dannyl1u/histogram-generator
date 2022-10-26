//  Source: Some parts of this code from my CMPT 276 assignment
// https://csil-git1.cs.surrey.sfu.ca/dla216/cmpt276asn1
var grades = [];
var students = [];

class Student {
    constructor(name, percent) {
        this.name = name
        this.percent = percent
    }
}

const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

    myForm.addEventListener("submit", function (e) {
      var error = document.getElementById("error")
      error.innerHTML = ""
      var successMessage = document.getElementById("success")
      successMessage.innerHTML = ""
      grades = []  
      e.preventDefault();
      const input = csvFile.files[0];
      const reader = new FileReader();
      reader.readAsText(input);

      reader.onload = function (e) {
        var text = e.target.result;
        text = text.split(/\r?\n/)
        for (let i = 0; i < text.length; i++) {
            text[i] = text[i].split(",")
            console.log(parseInt(text[i].length))
            console.log(text[i][1])
            if (parseInt(text[i].length) != 2 || (isNaN(text[i][1]) && i>0)) {
                error.innerHTML = "Error parsing the file. Please check the format and try again!"
                return
            }
        }

        for (let i = 1; i < text.length; i++) {
            var s = new Student(text[i][0], text[i][1])
            grades.push(parseFloat(text[i][1]))
            students.push(s)
        }

        successMessage.innerHTML = "Success."
        displayHistogram()
        var meanGrade = document.getElementById("mean")
        meanGrade.innerHTML = mean(grades).toFixed(2)
        var medianGrade = document.getElementById("median")
        medianGrade.innerHTML = median(grades).toFixed(2)
        console.log(highestStudent(students))
        var highest = document.getElementById("highest")
        highest.innerHTML = highestStudent(students).name.trim() + " (" + highestStudent(students).percent + "%)"
        var lowest = document.getElementById("lowest")
        lowest.innerHTML = lowestStudent(students).name.trim() + " (" + lowestStudent(students).percent + "%)"
      };
    });

function mean(numbers) {
    var total = 0, i;
    for (i = 0; i < numbers.length; i += 1) {
        total += numbers[i];
    }
    return total / numbers.length;
}

function median(numbers) {
   const sorted = numbers.sort(function(a, b){return a - b})
   const middle = Math.floor(sorted.length / 2)
   if (numbers % 2 == 0) { 
        return (sorted[middle - 1] + sorted[middle]) / 2
   } else { 
        return sorted[middle]
   }
}

function highestStudent(arr) {
    var maxStudent = arr[0]
    var max = parseFloat(arr[0].percent);
    for (let i = 0; i < arr.length; i++) {
        if (parseFloat(arr[i].percent) > max) {
            max = arr[i].percent;
            maxStudent = arr[i]
        }
    }
    return maxStudent
}

function lowestStudent(arr) {
    var minStudent = arr[0]
    var min = parseFloat(arr[0].percent);
    console.log(min)

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].percent < min) {
            min = parseFloat(arr[i].percent);
            minStudent = arr[i]
        }
    }
    return minStudent
}

var input = document.getElementById("newGrade");

var lowerBoundsTable = document.getElementById("lowerBoundsTable");
lowerBoundsTable.onchange = function(evt) {
    setLowerBounds();
}

var max;
var aPlus;
var aPlusHistogram;
var a;
var aHistogram;
var aMinus;
var aMinusHistogram;
var bPlus;
var bPlusHistogram;
var b;
var bHistogram;
var bMinus;
var bMinusHistogram;
var cPlus;
var cPlusHistogram;
var c;
var cHistogram;
var cMinus;
var cMinusHistogram;
var d;
var dHistogram;
var f;
var fHistogram;

setLowerBounds();

function setLowerBounds() {
    max = parseFloat(document.getElementById("Max").value);
    
    aPlus = parseFloat(document.getElementById("aPlus").value);
    aPlusHistogram = document.getElementById("aPlusHistogram");
    a = parseFloat(document.getElementById("a").value)
    aHistogram = document.getElementById("aHistogram");
    aMinus = parseFloat(document.getElementById("aMinus").value);
    aMinusHistogram = document.getElementById("aMinusHistogram");
    bPlus = parseFloat(document.getElementById("bPlus").value);
    bPlusHistogram = document.getElementById("bPlusHistogram");
    b = parseFloat(document.getElementById("b").value);
    bHistogram = document.getElementById("bHistogram");
    bMinus = parseFloat(document.getElementById("bMinus").value);
    bMinusHistogram = document.getElementById("bMinusHistogram");
    cPlus = parseFloat(document.getElementById("cPlus").value);
    cPlusHistogram = document.getElementById("cPlusHistogram");
    c = parseFloat(document.getElementById("c").value);
    cHistogram = document.getElementById("cHistogram");
    cMinus = parseFloat(document.getElementById("cMinus").value);
    cMinusHistogram = document.getElementById("cMinusHistogram");
    d = parseFloat(document.getElementById("d").value);
    dHistogram = document.getElementById("dHistogram");
    f = parseFloat(document.getElementById("f").value);
    fHistogram = document.getElementById("fHistogram");
}

displayHistogram();

var lowerBounds = document.getElementById("lowerBoundsTable");
lowerBounds.onchange = function(evt) {
    displayHistogram();
}

function displayHistogram() {
    if (aPlus >= max) {
        alert("WARNING: Lower-bounds overlapping: \nMax should be greater than A+.");
    } else if (a >= aPlus) {
        alert("WARNING: Lower-bounds overlapping: \nA+ should be greater than A.");
    } else if (aMinus >= a) {
        alert("WARNING: Lower-bounds overlapping: \nA should be greater than A-.");
    } else if (bPlus >= aMinus) {
        alert("WARNING: Lower-bounds overlapping: \nA- should be greater than B+.");
    } else if (b >= bPlus) {
        alert("WARNING: Lower-bounds overlapping: \nB+ should be greater than B.");
    } else if (bMinus >= b) {
        alert("WARNING: Lower-bounds overlapping: \nB should be greater than B-.");
    } else if (cPlus >= bMinus) {
        alert("WARNING: Lower-bounds overlapping: \nB- should be greater than C+.");
    } else if (c >= cPlus) {
        alert("WARNING: Lower-bounds overlapping: \nC+ should be greater than C.");
    } else if (cMinus >= c) {
        alert("WARNING: Lower-bounds overlapping: \nC should be greater than C-.");
    } else if (d >= cMinus) {
        alert("WARNING: Lower-bounds overlapping: \nC- should be greater than D.");
    } else if (f >= d) {
        alert("WARNING: Lower-bounds overlapping: \nD should be greater than F.");
    }

    aPlusArr = [];
    aArr = [];
    aMinusArr = [];
    bPlusArr = [];
    bArr = [];
    bMinusArr = [];
    cPlusArr = [];
    cArr = [];
    cMinusArr = [];
    dArr = [];
    fArr = [];
    for (var i = 0; i < grades.length; i++) {
        if (grades[i] > aPlus) {
            aPlusArr.push("O");
        }
        else if (grades[i] >= a && grades[i] < aPlus) {
            aArr.push("O");
        }
        else if (grades [i] >= aMinus && grades[i] <= a) {
            aMinusArr.push("O");
        }
        else if (grades[i] >= bPlus && grades[i] < a) {
            bPlusArr.push("O");
        }
        else if (grades[i] >= b && grades[i] < bPlus) {
            bArr.push("O");
        }
        else if (grades[i] >= bMinus && grades[i] < b) {
            bMinusArr.push("O");
        }
        else if (grades[i] >= cPlus && grades[i] < bMinus) {
            cPlusArr.push("O");
        }
        else if (grades[i] >= c && grades[i] < cPlus) {
            cArr.push("O");
        }
        else if (grades[i] >= cMinus && grades[i] < c) {
            cMinusArr.push("O");
        }
        else if (grades[i] >= d && grades[i] < cMinus) {
            dArr.push("O");
        }
        else if (grades[i] >= f && grades[i] < d) {
            fArr.push("O");
        }
    }
    aPlusHistogram.innerHTML = aPlusArr.join('');
    aHistogram.innerHTML = aArr.join('');
    aMinusHistogram.innerHTML = aMinusArr.join('');
    bPlusHistogram.innerHTML = bPlusArr.join('');
    bHistogram.innerHTML = bArr.join('');
    bMinusHistogram.innerHTML = bMinusArr.join('');
    cPlusHistogram.innerHTML = cPlusArr.join('');
    cHistogram.innerHTML = cArr.join('');
    cMinusHistogram.innerHTML = cMinusArr.join('');
    dHistogram.innerHTML = dArr.join('');
    fHistogram.innerHTML = fArr.join('');
}