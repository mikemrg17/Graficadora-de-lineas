
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
import objects.Usuario;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

/**
 *
 * @author miguel
 */

public class InsertarUsuario extends HttpServlet {
    
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
        JSONObject jsonUsuario = new JSONObject(); 
        
        //Parseamos el String a JSONObject y lo asignamos al JSONObject que lo almacenarÃ¡
        try {
            jsonUsuario = (JSONObject) parser.parse(payloadRequest);
        } catch (ParseException ex) {
            Logger.getLogger(InsertarUsuario.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("Objeto JSON es: " + jsonUsuario);
        
        //Email
        String email = (String) jsonUsuario.get("email");
        System.out.println("El usuario es: " + email);
        //Nombre
        String nombre = (String) jsonUsuario.get("nombre");
        System.out.println("El nombre es: " + nombre);
        //Apellido
        String apellido = (String) jsonUsuario.get("apellido");
        System.out.println("El apellido es: " + apellido);
        //Password
        String password = (String) jsonUsuario.get("password");
        System.out.println("La contraseÃ±a es: " + password);
        
        //Rol comÃºn
        int rol = 2;
        
        Usuario nuevoUsuario = new Usuario(email, nombre, apellido, password, rol);
        
        int row;
        try {
            int contador=0;
            Class.forName("com.mysql.jdbc.Driver");
            Connection db = DriverManager.getConnection("jdbc:mysql://localhost/graficadoraDeLineas","miguel", "1234");
            PreparedStatement statement = db.prepareStatement("INSERT INTO usuarios(email,nombre,apellido,password,idRol) VALUES(?,?,?,?,?)");
            statement.setString(1, nuevoUsuario.getEmail());
            statement.setString(2, nuevoUsuario.getNombre());
            statement.setString(3, nuevoUsuario.getApellido());
            statement.setString(4, nuevoUsuario.getPassword());
            statement.setInt(5, nuevoUsuario.getRol());
            row = statement.executeUpdate();
            System.out.println("Se insertÃ³ a la base de datos");
            
            
            Statement s = db.createStatement();
            ResultSet rs=s.executeQuery("SELECT * FROM usuarios WHERE email='"+email+"' AND nombre='"+nombre+"' AND apellido='"+apellido+"' AND password='"+password+"' AND idRol='"+rol+"';");
            while(rs.next()){
                int idUsuario = rs.getInt("idUsuario");
                String emailUsuario = rs.getString("email");
                String nombreUsuario = rs.getString("nombre");
                String apellidoUsuario = rs.getString("apellido");
                String passwordUsuario = rs.getString("password");
                int rolUsuario = rs.getInt("idRol");
                json.append(idUsuario);
                json.append(",");
                json.append(emailUsuario);
                json.append(",");
                json.append(nombreUsuario);
                json.append(",");
                json.append(apellidoUsuario);
                json.append(",");
                json.append(passwordUsuario);
                json.append(",");
                json.append(rolUsuario);
            }
            
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
