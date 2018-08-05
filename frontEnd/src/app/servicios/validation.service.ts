export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Campo requerido',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
            'minlength': `Tamaño minimo ${validatorValue.requiredLength}`,
            'validateDecimal12_2': 'Por favor Introduzca un numero correcto , formato xxxxxxxxxx.xx',
            'validateDecimal5_2': 'Por favor Introduzca un numero correcto , formato xxxxx.xx',
            'validateFieldParam': 'El valor no es correcto',
            'invalidYear': 'Año invalido',
        };
        //console.log(config);
        return config[validatorName];
    }
  

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (control.value != undefined && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return { 'invalidEmailAddress': true };
        }
    }

    

  
}