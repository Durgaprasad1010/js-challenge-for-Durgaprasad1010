let row = 0;
function validate() {
    let firstNameInput = document.getElementById('user-first-name').value
    let lastNameInput = document.getElementById('user-last-name').value
    let usernameInput = document.getElementById('username').value
    let emailInput = document.getElementById('user-email').value
    let addressInput = document.getElementById('user-address').value
    let userPhoneInput = document.getElementById('user-phone').value
    let userWebsiteInput = document.getElementById('user-website').value
    let userCompanyInput = document.getElementById('user-company-name').value


    let error = false

    if (firstNameInput) {

        if (isAlphanumeric(firstNameInput) && firstNameInput.length >= 3) {

            document.getElementById('first-name-invalid').style.display = 'none'
        } else {
            document.getElementById('first-name-invalid').style.display = 'block'

            error = true
        }
    } else {
        error = true;
    }

    if (lastNameInput) {

        if (isAlphanumeric(lastNameInput) && lastNameInput.length >= 3) {
            document.getElementById('last-name-invalid').style.display = 'none'
        } else {
            document.getElementById('last-name-invalid').style.display = 'block'
            error = true
        }
    } else {
        error = true;
    }


    if (usernameInput) {
        let isValid = true;
        for (var i = 0; i < usernameInput.length; i++) {
            var ch = usernameInput.charAt(i);
            var cc = ch.charCodeAt(0);

            if ((cc > 47 && cc < 58) || (cc > 64 && cc < 91) || (cc > 96 && cc < 123) || cc === 46) {
                continue;
            } else {
                isValid = false;
                document.getElementById('username-invalid').style.display = 'block'
                error = true
                break;

            }
        }
        if (isValid) {

            document.getElementById('username-invalid').style.display = 'none'

        }
    } else {
        error = true;
    }

    if (emailInput) {

        if (emailInput.includes("@") &&
            emailInput.includes(".") &&
            emailInput.lastIndexOf(".") <= emailInput.length - 3 &&
            emailInput.indexOf('@') !== 0
        ) {

            document.getElementById("email-invalid").style.display = "none";
        } else {
            document.getElementById("email-invalid").style.display = "block";
            error = true
        }
    } else {
        error = true;
    }

    if (addressInput) {

        document.getElementById("address-invalid").style.display = "none";
    } else {

        error = true
    }

    let phone_input = document.getElementById("user-phone");

    phone_input.addEventListener('input', () => {
        phone_input.setCustomValidity('');
        phone_input.checkValidity();
    });

    phone_input.addEventListener('invalid', () => {
        if (phone_input.checkValidity() === false) {
            document.getElementById("phone-invalid").style.display = "block";
            error = true;
        }
        if (phone_input.value === '') {
            phone_input.setCustomValidity('Enter phone number!');
            document.getElementById("phone-invalid").style.display = "block";
            error = true
        } else {
            phone_input.setCustomValidity('Enter phone number in this format: 123-456-7890');
            document.getElementById("phone-invalid").style.display = "block";
            error = true
        }
    });

    if (!error) {
        let userDetails = {
            firstNameInput,
            lastNameInput,
            usernameInput,
            emailInput,
            addressInput,
            userPhoneInput,
            userWebsiteInput,
            userCompanyInput
        }

        row++;

        insertIntoTable(userDetails);

        alert('Your details have been saved successfully!')
        document.getElementById('user-first-name').value = ''
        document.getElementById('user-last-name').value = ''
        document.getElementById('username').value = ''
        document.getElementById('user-email').value = ''
        document.getElementById('user-address').value = ''
        document.getElementById('user-phone').value = ''
        document.getElementById('user-website').value = ''
        document.getElementById('user-company-name').value = ''


    }
}

function isAlphanumeric(inputValue) {

    for (var i = 0; i < inputValue.length; i++) {
        var ch = inputValue.charAt(i);
        var cc = ch.charCodeAt(0);

        if ((cc > 47 && cc < 58) || (cc > 64 && cc < 91) || (cc > 96 && cc < 123)) {
            continue;
        } else {

            return false;
        }
    }

    return true;
}


function insertIntoTable(user) {
    const tbodyElement = document.getElementById('user-data');
    const trElement = document.createElement('tr');
    const serialNumEle = document.createElement('td');
    const nameEle = document.createElement('td');
    const usernameEle = document.createElement('td');
    const emailEle = document.createElement('td');
    const addressEle = document.createElement('td');
    const phoneEle = document.createElement('td');
    const websiteEle = document.createElement('td');
    const companyNameEle = document.createElement('td');


    serialNumEle.innerHTML = row;
    nameEle.innerHTML = user.firstNameInput + user.lastNameInput;
    usernameEle.innerHTML = user.usernameInput;
    emailEle.innerHTML = user.emailInput;
    addressEle.innerHTML = user.addressInput;
    phoneEle.innerHTML = user.userPhoneInput;
    websiteEle.innerHTML = user.userWebsiteInput;
    companyNameEle.innerHTML = user.userCompanyInput;

    trElement.appendChild(serialNumEle);
    trElement.appendChild(nameEle);
    trElement.appendChild(usernameEle);
    trElement.appendChild(emailEle);
    trElement.appendChild(addressEle);
    trElement.appendChild(phoneEle);
    trElement.appendChild(websiteEle);
    trElement.appendChild(companyNameEle);
    tbodyElement.appendChild(trElement);

}

function loadTable() {
    const tbodyElement = document.getElementById('user-data');

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            row = data.length;
            data.forEach((obj) => {

                const objt = Object.keys(obj);
                const trEle = document.createElement('tr');
                let j = 0;
                for (const key in obj) {
                    const kvalue = key + "";
                    const userInfo = document.createElement('td');
                    if (objt[j] === "address") {
                        userInfo.innerHTML = obj[kvalue].street + ", " + obj[kvalue].suite + ", " + obj[kvalue].city + ", " + obj[kvalue].zipcode;
                    } else if (objt[j] === "company") {
                        userInfo.innerHTML = obj[kvalue].name;
                    } else {
                        userInfo.innerHTML = obj[kvalue];
                    }
                    trEle.appendChild(userInfo);
                    j++;

                }
                tbodyElement.appendChild(trEle);

            });
        })
        .catch(error => {
            console.log(`Something went wrong while fetching the users. Error - ${error}`);
        })
}