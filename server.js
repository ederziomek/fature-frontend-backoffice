const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'build')));

// Middleware para parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0'
    });
});

// API status endpoint
app.get('/api/status', (req, res) => {
    res.status(200).json({
        api: 'online',
        timestamp: new Date().toISOString()
    });
});

// Rota principal
app.get('/', (req, res) => {
    try {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Fature Frontend Backoffice</title>
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
                    .container { max-width: 800px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                    h1 { color: #333; text-align: center; }
                    .status { background: #e8f5e8; padding: 20px; border-radius: 4px; margin: 20px 0; }
                    .info { background: #e8f4fd; padding: 15px; border-radius: 4px; margin: 10px 0; }
                    .server-info { font-family: monospace; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🚀 Fature Frontend Backoffice</h1>
                    <div class="status">
                        <h3>✅ Sistema Online</h3>
                        <p>Aplicação rodando com sucesso na nova arquitetura EC2 otimizada!</p>
                    </div>
                    <div class="info">
                        <h4>📊 Informações do Sistema:</h4>
                        <p><strong>Ambiente:</strong> ${process.env.NODE_ENV || 'production'}</p>
                        <p><strong>Versão:</strong> ${process.env.npm_package_version || '1.0.0'}</p>
                        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
                        <p><strong>Porta:</strong> ${port}</p>
                    </div>
                    <div class="info">
                        <h4>🔗 Endpoints Disponíveis:</h4>
                        <ul>
                            <li><a href="/health">Health Check</a></li>
                            <li><a href="/api/status">API Status</a></li>
                        </ul>
                    </div>
                    <div class="server-info">
                        Server: ${require('os').hostname()} | PID: ${process.pid}
                    </div>
                </div>
            </body>
            </html>
        `);
    } catch (error) {
        console.error('Erro na rota principal:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Catch all - serve index.html para SPAs
app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
            if (err) {
                console.error('Erro ao servir index.html:', err);
                res.status(404).send('Page not found');
            }
        });
    } catch (error) {
        console.error('Erro no catch-all:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Middleware de tratamento de erros
app.use((err, req, res, next) => {
    console.error('Erro não tratado:', err);
    res.status(500).json({
        error: 'Erro interno do servidor',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
    });
});

// Tratamento de erros não capturados
process.on('uncaughtException', (err) => {
    console.error('Exceção não capturada:', err);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Promise rejeitada não tratada:', reason);
    process.exit(1);
});

app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 Fature Frontend Backoffice rodando na porta ${port}`);
    console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🏥 Health check: http://localhost:${port}/health`);
});
