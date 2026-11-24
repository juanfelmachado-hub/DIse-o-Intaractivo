import restart from 'vite-plugin-restart'

export default {
    root: 'src/', // Sources files (typically where index.html is)
    base: './', // Rutas relativas: funciona en GitHub Pages (subcarpeta del repo)
    publicDir: '../static/', // Path from "root" to static assets (files that are served as they are)
    server:
    {
        host: true, // Open to local network and display URL
        open: !('SANDBOX_URL' in process.env || 'CODESANDBOX_HOST' in process.env) // Open if it's not a CodeSandbox
    },
    build:
    {
        outDir: '../dist', // Output in the dist/ folder
        // NO se vacía dist/: ahí también vive la versión del visor (dist/vr/) y los
        // paquetes .js anteriores. GitHub Pages guarda index.html 10 min en caché: si se
        // borra el .js viejo, quien tenga la página abierta ve el cuento roto.
        emptyOutDir: false,
        sourcemap: true // Add sourcemap
    },
    plugins:
    [
        restart({ restart: [ '../static/**', ] }) // Restart server on static file change
    ],
}