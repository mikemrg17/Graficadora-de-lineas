
package Api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author miguel
 */

public class EditarEjercicio extends HttpServlet {
    
    private PrintWriter out;
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        out = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        StringBuilder json = new StringBuilder();
            
        //Primero obtenemos el Objeto JSON que viene del cliente y lo transformamos a String
        String payloadRequest = getBody(request);
        System.out.println("Objeto es: " + payloadRequest);
        
        //Inicializamos el parser para transformar el String a JSONObject
        JSONParser parser = new JSONParser();
        
        //Inicializamos el nuevo objeto json
        JSONObject jsonEjercicio = new JSONObject(); 
        
        //Parseamos el String a JSONObject y lo asignamos al JSONObject que lo almacenarÃ¡
        try {
            jsonEjercicio = (JSONObject) parser.parse(payloadRequest);
        } catch (ParseException ex) {
            ex.printStackTrace();
        }
        System.out.println("Objeto JSON es: " + jsonEjercicio);
        //idUsuario
        long idEjercicio = (long) jsonEjercicio.get("idEjercicio");
        System.out.println("El idUsuario es: " + idEjercicio);
        //x1
        long x1 = (long) jsonEjercicio.get("x1");
        System.out.println("El x1 es: " + x1);
        //Nombre
        long y1 = (long) jsonEjercicio.get("y1");
        System.out.println("El y1 es: " + y1);
        //Apellido
        long x2 = (long) jsonEjercicio.get("x2");
        System.out.println("El x2 es: " + x2);
        //Password
        long y2 = (long) jsonEjercicio.get("y2");
        System.out.println("El y2 es: " + y2);
        
        int row;
        try {
            int contador=0;
            Class.forName("com.mysql.jdbc.Driver");
            Connection db = DriverManager.getConnection("jdbc:mysql://localhost/graficadoraDeLineas","miguel", "1234");
                PreparedStatement statement = db.prepareStatement("UPDATE ejercicios SET x1=?, y1=?, x2=?, y2=? WHERE idEjercicio='"+idEjercicio+"'");
            statement.setLong(1, x1);
            statement.setLong(2, y1);
            statement.setLong(3, x2);
            statement.setLong(4, y2);
            row = statement.executeUpdate();
            System.out.println("Se modifico en la base de datos");
            
        } catch (Exception ex) {
            System.out.println("No se pudo insertar el registro");
            ex.printStackTrace();
        }
        out.write(json.toString());
    }
    
    //MÃ©todo para obtener el cuerpo del request
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
