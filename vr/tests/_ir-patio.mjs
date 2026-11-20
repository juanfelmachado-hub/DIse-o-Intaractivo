export default async function run({page,frame}){return (frame??page).evaluate(()=>{window.__go="patio";return 1})}
