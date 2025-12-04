const apiUrlMenu = import.meta.env.VITE_API_URL_MENU

export interface response {
    success:boolean,
    url:string,
    filename:string
}

export const downloadMenu = async(): Promise<string> => {
    try {
        const response = await fetch(`${apiUrlMenu}/download`, {
            method: 'GET'
        })

        if(!response.ok) throw new Error(`HTTP ${response.status}`)
            const data: response = await response.json()

        if(!data.success || !data.url) throw new Error('url non disponibile')
            console.log('url ricevuto')
        return data.url
    } catch (err) {
        console.error('errore nel download')
        throw err
    }
}