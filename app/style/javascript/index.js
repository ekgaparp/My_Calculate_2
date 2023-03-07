addDigit = (value) => {
    document.getElementById("result").value += value;
}


addOperator = (value) => {
    const result = document.getElementById("result");
    const lastChar = result.value[result.value.length - 1];
    if (result.value === '' || lastChar === '+' || lastChar === '-' || lastChar === '*' || lastChar === '/' || lastChar === '.') {
        if (value === '+' || value === '-' || value === '*' || value === '/') {
            result.value = result.value.slice(0, result.value.length - 1) + value;
        }
    } else {

        result.value += value;
    }
}
clearResult = () => {
    document.getElementById("result").value = "";
}

calculateResult = async () => {
    const equation = document.getElementById("result").value;
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    })
    await Toast.fire({
        icon: 'info',
        title: 'Calculating...',
        didOpen: () => {
            Toast.showLoading();
            fetch('/calculate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    equation: equation
                })
            })
                .then(response => response.json())
                .then(data => {
                    if (data.result === 'Invalid Equation') {
                        Toast.fire({
                            icon: 'error',
                            title: 'Invalid Equation!',
                        });
                    } else {
                        Toast.fire({
                            icon: 'success',
                            title: 'Result of ' + equation + ' is ' + data.result,
                        });
                        document.getElementById("result").value = data.result;
                    }
                })
                .catch(error => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Something went wrong!'
                    });
                });
        }
    })
};