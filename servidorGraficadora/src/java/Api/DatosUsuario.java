package Api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author Luis
 */
public class DatosUsuario extends HttpServlet {

    private PrintWriter out;
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        out = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        StringBuilder json = new StringBuilder();
        
        String idSolicitado = request.getParameter("id");
        JSONArray array = new JSONArray();
        try{
            int contador=0;
            Class.forName("com.mysql.jdbc.Driver");
            Connection db = DriverManager.getConnection("jdbc:mysql://localhost/graficadoraDeLineas","miguel", "1234");
            Statement s = db.createStatement();
            //ResultSet rs = s.executeQuery("SELECT JSON_ARRAYAGG(JSON_OBJECT('idEjercicio', idEjercicio, 'x1', x1, 'y1', y1, 'x2', x2, 'y2', y2)) AS jsonE FROM ejercicios WHERE idUsuario = '"+idSolicitado+"';");
            ResultSet rs=s.executeQuery("SELECT * FROM usuarios WHERE idRol=2;");
            
            //JSONObject jsonObject = new JSONObject();
            
            
            while(rs.next()){
                JSONObject ejercicioJson = new JSONObject();
                ejercicioJson.put("idUsuario", rs.getInt("idUsuario"));
                ejercicioJson.put("nombre", rs.getString("nombre"));
                array.add(ejercicioJson);
                //String jsonRes=rs.getString("jsonE");
                //json.append(jsonRes);
            }
            
            System.out.println("El objeto json de usuarios a enviar es: " + array.toString());
            json.append(array.toString());
        }
        catch(Exception e){
            e.printStackTrace();
        }
        out.write(json.toString());
    }
    
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
