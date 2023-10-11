const chooser = (type) => {
    let iconSized
    switch (type) {
        case "Block":
            iconSized = {
                url: '/block/scene.gltf',
                scale: 2
            }
            return iconSized
        case "Traffic":
            iconSized = {
                url: '/traffic/scene.gltf',
                scale: 10
            }
            return iconSized
        // fall
        case "Construction":
            iconSized = {
                url: '/repair/scene.gltf',
                scale: 5
            }
            return iconSized
        case "Supervise":
            iconSized = {
                url: '/buster_drone/scene.gltf',
                scale: 8
            }
            return iconSized
        default:
            alert("error, can not detect the type of the mark")
            return 
    }
}

export default chooser