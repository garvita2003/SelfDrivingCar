class Controls
{
    constructor(type){
        this.forward = false;
        this.backward = false;
        this.left = false;
        this.right = false;

        //select the control type of the car 
        switch(type)
        {
            case "KEYS":
                //keyboard listener - check whenever we press the keys in the keyboard
                this.#addKeyboardListeners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }
    }

    // We have put # becuase its a private method and cannot be accessed outside the controls class
    #addKeyboardListeners(){

        //Pressing the key
        document.onkeydown = (event) => {
            switch(event.key)
            {
                case 'ArrowUp':
                    this.forward = true;
                    break;
                case 'ArrowDown':
                    this.backward = true;
                    break;
                case 'ArrowLeft':
                    this.left = true;
                    break;
                case 'ArrowRight':
                    this.right = true;
                    break;
            }
        }

        //Releasing the key
        document.onkeyup = (event) => {
            switch(event.key)
            {
                case 'ArrowUp':
                    this.forward = false;
                    break;
                case 'ArrowDown':
                    this.backward = false;
                    break;
                case 'ArrowLeft':
                    this.left = false;
                    break;
                case 'ArrowRight':
                    this.right = false;
                    break;
            }
        }
    }
}