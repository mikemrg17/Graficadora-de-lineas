
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
import objects.Ejercicio;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author miguel
 */

public class InsertarEjercicio extends HttpServlet {
    
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
            //Logger.getLogger(InsertarUsuario.class.getName()).log(Level.SEVERE, null, ex);
            System.out.println("Error al pasear objeto entrante");
        }
        System.out.println("Objeto JSON es: " + jsonEjercicio);
        
        //IdUsuario
        String idUsuario = (String) jsonEjercicio.get("id");
        System.out.println("El id del usuario es: " + idUsuario);
        //Email
        long x1 = (long) jsonEjercicio.get("x1");
        //System.out.println("X1 es: " + x1);
        //Nombre
        long y1 = (long) jsonEjercicio.get("y1");
        //System.out.println("Y1 es: " + y1);
        //Apellido
        long x2 = (long) jsonEjercicio.get("x2");
        //System.out.println("X2 es: " + x2);
        //Password
        long y2 = (long) jsonEjercicio.get("y2");
        //System.out.println("Y2 es: " + y2);
        
        //Para objeto Ejercicio
        Ejercicio ejercicioNuevo = new Ejercicio(x1, y1, x2, y2);
        System.out.println("X1 ES: " + ejercicioNuevo.getX1());
        System.out.println("X1 ES: " + ejercicioNuevo.getY1());
        System.out.println("X1 ES: " + ejercicioNuevo.getX2());
        System.out.println("X1 ES: " + ejercicioNuevo.getY2());
        
        
        int row;
        try {
            int contador=0;
            Class.forName("com.mysql.jdbc.Driver");
            Connection db = DriverManager.getConnection("jdbc:mysql://localhost/graficadoraDeLineas","miguel", "1234");
            PreparedStatement statement = db.prepareStatement("INSERT INTO ejercicios(x1,y1,x2,y2,idUsuario) VALUES(?,?,?,?,?)");
            statement.setLong(1, ejercicioNuevo.getX1());
            statement.setLong(2, ejercicioNuevo.getY1());
            statement.setLong(3, ejercicioNuevo.getX2());
            statement.setLong(4, ejercicioNuevo.getY2());
            statement.setInt(5, Integer.parseInt(idUsuario));
            row = statement.executeUpdate();
            System.out.println("Se insertÃ³ a la base de datos");
            
        } catch (Exception ex) {
            System.out.println("No se pudo insertar el registro");
            ex.printStackTrace();
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
