export const  youtube =  (url) => {
    // Match both standard and shortened YouTube URLs
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?.*v=|embed\/|v\/|.*[&?])v=)([^&?]+)/);
    return match && match[1] ? match[1] : null;
}

export default youtube