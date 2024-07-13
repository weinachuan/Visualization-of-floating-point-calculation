function visualizeFloat() {
    const floatInput = document.getElementById('floatInput').value;
    const floatNumber = parseFloat(floatInput);

    if (isNaN(floatNumber)) {
        alert('Please enter a valid float number');
        return;
    }

    const float32Array = new Float32Array(1);
    float32Array[0] = floatNumber;
    const uint32Array = new Uint32Array(float32Array.buffer);
    const binaryString = uint32Array[0].toString(2).padStart(32, '0');

    const signBit = binaryString.substring(0, 1);
    const exponentBits = binaryString.substring(1, 9);
    const mantissaBits = binaryString.substring(9, 32);

    document.getElementById('sign').innerHTML = `<span class="bit sign-bit">${signBit}</span>`;
    document.getElementById('exponent').innerHTML = exponentBits.split('').map(bit => `<span class="bit exponent-bit">${bit}</span>`).join('');
    document.getElementById('mantissa').innerHTML = mantissaBits.split('').map(bit => `<span class="bit mantissa-bit">${bit}</span>`).join('');
}
