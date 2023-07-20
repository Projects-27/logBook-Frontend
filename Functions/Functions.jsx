

export const isOnline = ()=>{
    return new Promise((resolve, reject) => {
        if(localStorage.getItem("user")){
            const data =  JSON.parse(localStorage.getItem("user"))
            resolve(data)
        }else{
            reject(null)
            window.location.assign("/")
        }
    })
}

export const logOut = ()=>{
    return new Promise((resolve, reject) => {
        localStorage.removeItem('user')
        location.reload()
    })
}