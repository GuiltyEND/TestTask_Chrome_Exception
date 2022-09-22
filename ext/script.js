const inputs = document.querySelectorAll("input");
const textareas = document.querySelectorAll("textarea");
const divs = document.querySelectorAll("div");

const div = document.createElement("div");

let textSlice = [];
let textSlice2 = [];

let text = "";

let Dictionary = {
  Cat: ["Dog", "Rat", "bat"],
  Helo: ["hello", "Help", "Hell"],
  heldp: ["help", "held", "hello"]
};




function createBox() {
  inputs.forEach((elem) => {
    elem.addEventListener("keyup", (e) => {
      text = e.target.value;
      textSlice = e.target.value.slice(-6);
      textSlice2 = e.target.value.slice(-5);

      if (
        e.code === "Space" &&
        text.slice(-1) == " " &&
        text[0] !== " " &&
        text.slice(-2) !== "  "
      ) {
        for (let key in Dictionary) {
          if (
            key == textSlice.replace(/\s/g, "") ||
            key == textSlice2.replace(/\s/g, "")
          ) {
            div.style =
              'tabindex="0"; background-color: grey; position:fixed; display:flex;justify-content:space-between;  opacity:0.7; margin-top:20px; width: 250px; height: 30px';
            const inputParent = elem.parentNode;
            inputParent.prepend(div);

            for (let i = 0; i < Dictionary[key].length; i++) {
              let p = document.createElement("div");
              div.append(p);
              p.style =
                "background-color: white;cursor:pointer; opacity:0.7;text-align:center; margin-top:5px; width: 30%; height: 20px";
              p.textContent = Dictionary[key][i];

              p.addEventListener("click", () => {
                let inputValue = e.target.value.split(" ");
                console.log(inputValue);
                inputValue[inputValue.length - 2] = Dictionary[key][i];
                e.target.value = inputValue.join(" ")
                console.log(inputValue);

                div.remove();
                while (div.firstChild) {
                  div.removeChild(div.firstChild);
                }
                e.target.focus();
              });
            }
          }
        }
      }
    
      switch (e.key) {
        case "Tab": {
          e.preventDefault();
          if (e.shiftKey) {
            prevWord();
          } else {
            nextWord();
          }
          break;
        }
        case "Enter": {
          e.preventDefault();
          selectWord();
          break;
        }
        case "Escape": {
          e.preventDefault();
          hideOverlay();
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          prevWord();
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          nextWord();
          break;
        }
        }

      if (e.code === "Backspace" || e.code === "Escape") {
        div.remove();
        while (div.firstChild) {
          div.removeChild(div.firstChild);
        }
     
      }
    });
  });
}

createBox();
