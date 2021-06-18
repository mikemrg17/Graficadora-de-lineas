
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
 * @author miguel
 */

public class EjerciciosUsuario extends HttpServlet {
    
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
            ResultSet rs=s.executeQuery("SELECT * FROM ejercicios WHERE idUsuario='"+idSolicitado+"' ORDER BY idEjercicio DESC;");
            
            while(rs.next()){
                JSONObject ejercicioJson = new JSONObject();
                ejercicioJson.put("idEjercicio", rs.getInt("idEjercicio"));
                ejercicioJson.put("x1", rs.getFloat("x1"));
                ejercicioJson.put("y1", rs.getFloat("y1"));
                ejercicioJson.put("x2", rs.getFloat("x2"));
                ejercicioJson.put("y2", rs.getFloat("y2"));
                array.add(ejercicioJson);
            }
            
            System.out.println("El objeto json de ejercicios a enviar es: " + array.toString());
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
