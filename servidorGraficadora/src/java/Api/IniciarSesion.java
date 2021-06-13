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
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;


/**
 *
 * @author axel_
 */


public class IniciarSesion extends HttpServlet {
    

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        //Se obtiene el JSON que viene del cliente y se pasa a String
        String payloadRequest = getBody(request);
        System.out.println("Objeto es: " + payloadRequest);

        //Se inicializa el parser para transformar el String a JSONObject
        JSONParser parser = new JSONParser();

        //Se inicializa el nuevo objeto json
        JSONObject jsonUsuario = new JSONObject(); 
        
        //Se parsea el String a JSONObject y se asigna al JSONObject que lo almacenará
        try {
            jsonUsuario = (JSONObject) parser.parse(payloadRequest);
        } catch (ParseException ex) {
            Logger.getLogger(IniciarSesion.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("Objeto JSON es: " + jsonUsuario);


        //Email
        String email = (String) jsonUsuario.get("email");
        System.out.println("El usuario es: " + email);

        //Password
        String password = (String) jsonUsuario.get("password");
        System.out.println("La contraseña es: " + password);
    
         //Rol común
        int rol = 2;
        System.out.println("El rol es: " + rol);

        try {
            if(validateUser(email,password)){
                response.sendRedirect("https://www.google.com/");
                System.out.println("Se inicio sesion exitosamente");
            }   
        } catch (Exception ex) {
            System.out.println("No se pudo iniciar sesion, intentelo mas tarde");
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


    public boolean validateUser (String emailToValidate, String passwordToValidate){

        String urlDB = "jdbc:mysql://localhost/graficadoraDeLineas";
        String usernameDB = "root";
        String passwordDB = "1234";
        String sqlquery = "select * from usuarios where email='" + emailToValidate + "' and " + "password='" + passwordToValidate + "'";

        try{
            Class.forName("com.mysql.jdbc.Driver"); 
            Connection db = DriverManager.getConnection(urlDB,usernameDB,passwordDB);
            System.out.println("Successfully connected to DB");
            Statement state = db.createStatement();
            ResultSet rs = state.executeQuery(sqlquery);
            rs.next();
            System.out.println("Usuario " + rs.getString(2) + " encontrado!");
            db.close();  
            return true;
        }catch(SQLException e){
            System.out.println("Error");
            e.printStackTrace();
            return false;
        }catch(ClassNotFoundException e){
            e.printStackTrace();
            return false;
        }
    }
}
