export interface Contract {
    id: number
    description: string
    fee: number
    imageUrl?: string
    name: string
    type: string
}

export interface GetContractsResult {
    contracts: Contract[]
}

const baseUrl = "http://localhost:3000"

export const getContracts = async (name = '', type = ''): Promise<GetContractsResult> => {
    let url = `${baseUrl}/api/contracts?contractName=${name}`
    if (type !== '') {
        url += `&contractType=${type}`
    }
    return fetch(url)
        .then((response) => response.json())
}

export const getContract = async (id: number): Promise<Contract> => {
    return fetch(`${baseUrl}/api/contracts/${id}`)
        .then((response) => response.json())
}