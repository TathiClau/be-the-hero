const connection = require('../database/connection');

module.exports = {

   
    async index(request, response) {
        const { page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
            .join('ongs', 'ong_id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5) /** A lista dos incidente que aparecerão nas paginas: Exemplo, página 0 vai de 1 a 5 */
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
            ]);
    
        response.header('X-Total-Count', count['count(*)']);
            
        return response.json(incidents);
    },
        
    
    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization; /** Autenticação do usuário vai pela chave primária */

    const [id] =  await connection('incidents').insert({
        title,
        description,
        value,
        ong_id,
    });

    return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params; /** Pegar o parãmetro que o usuário coloca la no http do navegador (incidents/:id) */
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incidente.ong_id != ong_id ) {
            return reponse.status(401).json({ error: 'Operation not permitted.'}) /** Código de status DO http que muda o status da resposta para erro */
        }
        
        await connection('incidents').where('id', id).delete();
        
        return response.status(204).send();
    }
};