function onTextChanged(){
    // Get textarea's input value
    const input = document.getElementById('ask_textarea').value;
    
    // Calculate remaining characters    
    const remainingChars = 200 - input.length;
    
    // Update <p> value
    document.getElementById("remaining_chars").innerHTML = remainingChars;
}

const textarea = document.getElementById("ask_textarea");
textarea.addEventListener("change", onTextChanged);
textarea.addEventListener("keyup", onTextChanged);
textarea.addEventListener("paste", onTextChanged);