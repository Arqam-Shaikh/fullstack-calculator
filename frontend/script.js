const display = document.getElementById("display");

const buttons = document.querySelectorAll("button");

// Handle button clicks
buttons.forEach(button => {

    button.addEventListener("click", function () {

        const value = button.innerText;

        // Clear display
        if (value === "C") {
            display.value = "";
        }

        // Calculate result
        else if (value === "=") {
            calculate();
        }

        // Display numbers and operators
        else {
            display.value += value;
        }

    });

});


// Calculator function
function calculate() {

    try {

        const expression = display.value;

        // Validate mathematical expression
        const match = expression.match(
            /^(-?\d+(?:\.\d+)?)\s*([+\-*/])\s*(-?\d+(?:\.\d+)?)$/
        );

        if (!match) {
            throw new Error("Invalid Expression");
        }

        const num1 = Number(match[1]);
        const operator = match[2];
        const num2 = Number(match[3]);

        let result;

        // Perform calculation
        switch (operator) {

            case "+":
                result = num1 + num2;
                break;

            case "-":
                result = num1 - num2;
                break;

            case "*":
                result = num1 * num2;
                break;

            case "/":

                if (num2 === 0) {
                    throw new Error("Cannot divide by zero");
                }

                result = num1 / num2;
                break;

        }

        // Display result
        display.value = Number(result.toFixed(10));

    }

    catch (error) {

        display.value = error.message;

    }

}