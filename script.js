let currentType = 'fp32';


var input_0_container_input = document.getElementById('input_0_input32');
var input_0_container_idx = document.getElementById('input_0_idx32');
var input_0_container_hex = document.getElementById('input_0_hex32');
var input_0_container_dec = document.getElementById('input_0_dec32');
var input_0_sign_exponent_fraction_32 = document.getElementById('input_0_sign_exponent_fraction_32');
var input_1_container_input = document.getElementById('input_1_input32');
var input_1_container_idx = document.getElementById('input_1_idx32');
var input_1_container_hex = document.getElementById('input_1_hex32');
var input_1_container_dec = document.getElementById('input_1_dec32');
var input_1_sign_exponent_fraction_32 = document.getElementById('input_1_sign_exponent_fraction_32');
// 生成32个输入框
gen_input_td(input_0_container_input, input_0_container_idx);
gen_input_td(input_1_container_input, input_1_container_idx);
// 初始化16进制输入
init_input_text_box(input_0_container_hex, input_0_container_input);
init_input_text_box(input_1_container_hex, input_1_container_input);
// 初始化符号位_阶码_尾数
init_SEF(input_0_sign_exponent_fraction_32)
init_SEF(input_1_sign_exponent_fraction_32)

function init_input_text_box(ElementHex, ElementInput){
    var defaultText = '0x';
    function setCaretToEnd(input) {
        var length = input.value.length;
        input.setSelectionRange(length, length);
    }
    function preventDefaultTextDeletion(event) {
        var input = event.target;
        if (!input.value.startsWith(defaultText)) {
            input.value = defaultText;
            setCaretToEnd(input);
        }
    }
    function validateInput(event) {
        var input = event.target;
        var value = input.value;
        var newValue = defaultText + value.substring(2).split('').map(function(char) {
            if (/^[0-9A-Fa-f]$/.test(char)) {
                return char.toUpperCase();
            } else {
                return '';
            }
        }).join('');
        if (newValue.length > 10) { // 2 characters for '0x' and 8 for the valid input
            newValue = newValue.substring(0, 10);
        }
        input.value = newValue;
        setCaretToEnd(input);
    }
    function autoFillZeros(event) {
        var input = event.target;
        var value = input.value.substring(2); // get the input part after '0x'
        while (value.length < 8) {
            value += '0';
        }
        input.value = defaultText + value.toUpperCase(); // ensure uppercase for any valid input
        updateOutputComponent(ElementInput);
    }
    function updateOutputComponent(ElementInput) {
        ElementInput.children[0].value = '1';
    }
    ElementHex.value = defaultText + "00000000";
    ElementHex.onclick = function() { 
        setCaretToEnd(this); 
    };
    ElementHex.oninput = validateInput;
    ElementHex.onkeydown = preventDefaultTextDeletion;
    ElementHex.onblur = autoFillZeros;
}

function init_SEF(sign_exponent_fraction) {
    var signValue = 1;
    var exponentValue = -127;
    var fractionValue = -127;
    var sign_context = document.createTextNode(`${signValue}`);
    var mul_context1 = document.createTextNode('×');
    var base = document.createTextNode('2');
    var halfSpace = document.createElement('span');
    var exponent_sup = document.createElement('sup');
    var mul_context2 = document.createTextNode('×');
    var fraction_context = document.createTextNode(`${fractionValue}`);
    var sign = document.createElement('span');
    var exponent = document.createElement('span');
    var fraction = document.createElement('span');
    var mul1 = document.createElement('span');
    var mul2 = document.createElement('span');
    exponent_sup.textContent = exponentValue;
    halfSpace.innerHTML = '&nbsp;';
    halfSpace.style.width = '2px';
    halfSpace.style.display = 'inline-block';
    sign.style.cursor = 'default';
    mul1.style.cursor = 'default';
    exponent.style.cursor = 'default';
    mul2.style.cursor = 'default';
    fraction.style.cursor = 'default';
    sign.appendChild(sign_context);
    mul1.appendChild(mul_context1);
    exponent.appendChild(base);
    exponent.appendChild(halfSpace);
    exponent.appendChild(exponent_sup);
    mul2.appendChild(mul_context2);
    fraction.appendChild(fraction_context);
    
    sign.style.backgroundColor = '#DDF';
    sign.style.width = '18px';
    sign.style.display = 'inline-block';
    sign.style.textAlign  = 'center';
    sign.style.marginRight  = '8px';

    mul1.style.marginRight  = '8px';
    
    exponent.style.backgroundColor = '#DFD';
    exponent.style.width = '90px';
    exponent.style.display = 'inline-block';
    exponent.style.textAlign  = 'center';
    exponent.style.marginRight  = '8px';

    mul2.style.marginRight  = '8px';

    fraction.style.backgroundColor = '#FDD';
    fraction.style.width = '200px';
    fraction.style.display = 'inline-block';
    fraction.style.textAlign  = 'center';
    fraction.style.marginRight  = '8px';
    sign_exponent_fraction.appendChild(sign);
    sign_exponent_fraction.appendChild(mul1);
    sign_exponent_fraction.appendChild(exponent);
    sign_exponent_fraction.appendChild(mul2);
    sign_exponent_fraction.appendChild(fraction);
}
// 点击切换值的函数
function toggleValue(input) {
    if (input.value === '0') {
        input.value = '1';
    } else {
        input.value = '0';
    }
}

function gen_input_td(ElementInput, ElementIndex) {
    for (var i = 0; i < 32; i++) {
        var newInput = document.createElement('input');
        var newIdx = document.createElement('p');
        var Idx = document.createElement('span');
        if (i < 10) {
            Idx.innerHTML = "&nbsp;" + i.toString()
        } else {
            Idx = document.createTextNode(i.toString());
        }
        newIdx.className = 'index'
        newIdx.id = 'idx' + i.toString();
        newIdx.style.fontFamily = 'Arial'; // or any other font
        newIdx.style.fontSize = '12px'; // adjust the size as needed
        newIdx.style.verticalAlign = 'middle';
        newIdx.style.color = '#9a9a9a';
        newIdx.appendChild(Idx);
        newIdx.setAttribute('readonly', 'true');
        newIdx.style.cursor = 'default';
        newInput.type = 'text';
        newInput.className = 'input';
        newInput.id = 'input' + i.toString();
        newInput.value = '0'; // 设置默认值
        newInput.style.textAlign  = 'center';
        newInput.style.cursor = 'default';
        newInput.style.userSelect = 'none'; // 禁止选择
        newInput.style.mozUserSelect = 'none'; // Firefox
        newInput.style.msUserSelect = 'none'; // IE/Edge
        newInput.setAttribute('readonly', 'true'); // 设置为只读
        newInput.setAttribute('onclick', 'toggleValue(this)'); // 添加点击事件
        // 设置不同的背景色
        if (i == 0) {
            newInput.style.backgroundColor = '#BBF';
        } else if (i > 0 && i < 9) {
            newInput.style.backgroundColor = '#BFB';
        } else {
            newInput.style.backgroundColor = '#FBB';
        }
        // 将新输入框添加到容器中
        ElementInput.appendChild(newInput);
        ElementIndex.appendChild(newIdx);
    }
}

function selectType(type) {
    currentType = type;

    // 更新导航栏的样式
    document.querySelectorAll('nav a').forEach(a => {
        if (a.textContent.toLowerCase() === type) {
            a.classList.add('active');
        } else {
            a.classList.remove('active');
        }
    });

    // 更新页面内容的显示
    document.querySelectorAll('.content').forEach(content => {
        if (content.id === type) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
    });
}

function calculate() {
    const num1 = parseFloat(document.getElementById('num1').value);
    const operator = document.getElementById('operator').value;
    const num2 = parseFloat(document.getElementById('num2').value);

    let result;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num1 / num2;
            break;
        default:
            result = 'Invalid operator';
    }

    document.getElementById('result').textContent = `Result: ${result} (${currentType.toUpperCase()})`;
}
