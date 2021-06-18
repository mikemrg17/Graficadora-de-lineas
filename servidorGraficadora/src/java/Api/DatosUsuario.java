package Api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

/**
 *
 * @author Luis
 */
public class DatosUsuario extends HttpServlet {

    //Variable de tipo PrintWriter para poder devolver algo en el response
    private PrintWriter out;
    
    //Servlet que acepta peticiones GET
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        //Le decimos al servlet que lo que regresará es un tipo json
        out = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        StringBuilder json = new StringBuilder();
        
        //Obtenemos el id de los parámetros del URL
        String idSolicitado = request.getParameter("id");
           
        //Creamos un arreglo de tipo JSONArray para devolver los usuarios
        JSONArray array = new JSONArray();
        try{
            //Bloque de código para ejecutar querys a la base de datos
            Class.forName("com.mysql.jdbc.Driver");
            Connection db = DriverManager.getConnection("jdbc:mysql://localhost/graficadoraDeLineas","miguel", "1234");
            Statement s = db.createStatement();
            ResultSet rs=s.executeQuery("SELECT * FROM usuarios WHERE idRol=2;");
            
            //Ciclo while para obtener los datos del usuario y guardarlo en el array
            while(rs.next()){
                JSONObject ejercicioJson = new JSONObject();
                ejercicioJson.put("idUsuario", rs.getInt("idUsuario"));
                ejercicioJson.put("nombre", rs.getString("nombre"));
                array.add(ejercicioJson);
            }
            
            System.out.println("El objeto json de usuarios a enviar es: " + array.toString());
            json.append(array.toString());
        }
        catch(Exception e){
            e.printStackTrace();
        }
        //Devolver como respuesta el json como cadena
        out.write(json.toString());
    }
    
    //Método para poder obtener el cuerpo del request, es decir, los datos mandados por el cliente
    public static String getBody(HttpServletRequest request) throws IOException {

    String body = null;
    StringBuilder stringBuilder = new StringBuilder();
    BufferedReader bufferedReader = null;

    try {
        InputStream inputStream = request.getInputStream();
        if (inputStream != null) {
            bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
            char[] charBuffer = new char[128];
            int bytesRead = -1;
            while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
                stringBuilder.append(charBuffer, 0, bytesRead);
            }
        } else {
            stringBuilder.append("");
        }
    } catch (IOException ex) {
        throw ex;
    } finally {
        if (bufferedReader != null) {
            try {
                bufferedReader.close();
            } catch (IOException ex) {
                throw ex;
            }
        }
    }

    body = stringBuilder.toString();
    return body;
}

}
