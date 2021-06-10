
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
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author miguel
 */

public class InsertarUsuario extends HttpServlet {
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String payloadRequest = getBody(request);
        System.out.println("Objeto es: " + payloadRequest);
        
        int row;
        try {
            Class.forName("com.mysql.jdbc.Driver");
            /*Connection db = DriverManager.getConnection("jdbc:mysql://localhost/crudjson","miguel", "1234");
            PreparedStatement statement = db.prepareStatement("INSERT INTO tablajson(columnajson) VALUES(?)");
            statement.setString(1, payloadRequest);
            row = statement.executeUpdate();*/
            System.out.println("Se insertó a la base de datos");
            
        } catch (Exception ex) {
            System.out.println("No se pudo editar el registro");
            ex.printStackTrace();
        }
        
        
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
