import { promises as fs } from 'fs';
// fs.writeFileSync = Para escribir contenido en un archivo. Si el archivo no existe, lo crea. Si existe, lo sobreescribe.
// fs.readFileSync = Para obtener el contenido de un archivo.
// fs.appendFileSync = Para añadir contenido a un archivo. ¡No se sobreescribe!
// fs.unlinkSync = Es el “delete” de los archivos. eliminará todo el archivo, no sólo el contenido.
// fs.existsSync = Corrobora que un archivo exista!

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.init();
    }

    async init() {
        // Get products from file or create it if it doesn't exist
        try {
            await fs.access(this.path);
            const data = await fs.readFile(this.path, 'utf8');
            this.products = data ? JSON.parse(data) : [];
        } catch (err) {
            if (err.code === 'ENOENT') {
                await fs.writeFile(this.path, '[]', 'utf8');
            } else {
                throw err;
            }
        }
    }

    async writeToFile() {
        // Write products to file
        await fs.writeFile(this.path, JSON.stringify(this.products, null, 4));
    }

    async addProduct(product) {
        // Add product to products array and write to file
        try {
            const newProduct = { ...product, "id": this.products.length + 1 };
            this.products.push(newProduct);
            await this.writeToFile();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    getProducts() {
        // Return products array
        return this.products;
    }

    getProductByID(id) {
        // Return product with given id
        return this.products.find(product => product.id == id);
    }

    async updateProduct(id, updatedProduct) {
        // Update product with given id and write to file
        try {
            this.products = this.products.map(product => product.id === id ? { ...product, ...updatedProduct, id } : product);
            await this.writeToFile();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async deleteProduct(id) {
        // Delete product with given id and write to file
        try {
            this.products = this.products.filter(product => product.id !== id);
            await this.writeToFile();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}