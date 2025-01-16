import React from "react";

export default function Dsylexic() {
React.useEffect(() => { 
    if(typeof window === 'undefined') return;
if(window.localStorage.getItem('use-dyslexic-font')) {
    console.log('using dyslexic font');
React.useCallback(() => {
    import('../assets/dsylexic.css');
    
}, [])
}
}, [])
return (<></>)
}