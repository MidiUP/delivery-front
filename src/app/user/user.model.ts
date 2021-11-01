

export class User{

    constructor(
        public name: string,
        public email: string,
        public password: string,
        public cpf: string,
        public phone: string,
        public id: number,
    ){}

}

export class RespostaModel{
    constructor(
        public cpfExiste: boolean,
        public phoneExiste: boolean,
        public emailExiste: boolean
    ){}
}