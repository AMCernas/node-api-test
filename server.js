const http = require('http');

let books = [
    {id: 1, title: '1984', author: 'George Orwell'},
    {id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee'},
    {id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald'}
]

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json')

    // GET /books - Retrieve all books
    if(req.url === '/books' && req.method === 'GET'){
        res.writeHead(200);
        res.end(JSON.stringify(books));
    } 
    
    // GET /books/:id - Retrieve a book by ID
    else if(req.url,startsWith('/books/') && req.method === 'GET'){
        const id = parseInt(req.url.split('/')[2])
        const book = books.find (b => b.id === id);
        if(!book){
            res.writeHead(404);
            res.end(JSON.stringify({error: 'Book Not Found'}));
        } else {
            res.writeHead(200);
            res.end(JSON.stringify(book));
        }
    } 
    
    // POST /books - Add a new book
    else if (req.url === '/books' && req.method === 'POST'){
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        })

        req.on('end', () => {
            const newBook = JSON.parse (body);
            newBook.id = books.length + 1;
            books.push(newBook);

            res.writeHead(201)
            res.end(JSON.stringify(newBook));
        });
    }
    
    // DELETE /books/:id - Delete a book by ID
    else if(req.url.startsWith('/books/') && req.method === 'DELETE'){
        const id = parseInt(req.url.split('/')[2]);
        books = books.filter(b => b.id !== id);

        res.writeHead(200);
        res.end(JSON.stringify({message: 'Book Deleted'}));
    } 
    
    // Handle 404 - Not Found
    else {
        res.writeHead(404);
        res.end(JSON.stringify({message: 'Page Not Found'}));
    }

})

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});