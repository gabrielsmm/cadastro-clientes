export class Cliente {
    id: number
    nome: string
    cnpj: string
    estado: string
    cidade: string
    bairro: string
    logradouro: string
    complemento: string
    cep: string
    latitude: number
    longitude: number

    public constructor(init?: Partial<any>) {
        Object.assign(this, init);
    }
}