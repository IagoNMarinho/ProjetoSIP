//api CLoudinary utilizada para o armazenamento das imagens de perfil, ja que o cloudStore do Firebase é uma alternativa paga

export async function enviarParaCloudinary(arquivo:File): Promise<string> {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    const formData = new FormData()
    formData.append('file', arquivo)
    formData.append('upload_preset', uploadPreset)

    const resposta = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData },
    )

    if(!resposta.ok){
        throw new Error('Falha ao enviar imagem para o Cloudinary.')
    }

    const dados = await resposta.json()
    return dados.secure_url;
}