
package Api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
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
public class ValidarEmailRepetido extends HttpServlet {

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
        
        //Parseamos el String a JSONObject y lo asignamos al JSONObject que lo almacenará
        try {
            jsonUsuario = (JSONObject) parser.parse(payloadRequest);
        } catch (ParseException ex) {
            Logger.getLogger(InsertarUsuario.class.getName()).log(Level.SEVERE, null, ex);
        }
        System.out.println("Objeto JSON es: " + jsonUsuario);
        
         //Email
        String email = (String) jsonUsuario.get("email");
        System.out.println("El usuario es: " + email);
        
        //Validacion de usuario
        String res = validateUser(email);
        System.out.println("La cadena es:" + res);
        
        try {
            if(res.equals("false")){
                json.append(res);
                
                System.out.println("El json a enviar es:"+json.toString());
                out.write(json.toString());
                
            }else { 
                json.append(res);  
                System.out.println("El json a enviar es:"+json.toString());
                out.write(json.toString());           
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

    //Función para validar que el email de la cuenta a registrar no esté en uso por otra cuenta
    public String validateUser (String emailToValidate){

        String urlDB = "jdbc:mysql://localhost/graficadoraDeLineas";
        String usernameDB = "root";
        String passwordDB = "1234";
        String sqlquery = "select * from usuarios where email='" + emailToValidate + "'";
        String usuario = "";
        String booleano = "";
        try{
            Class.forName("com.mysql.jdbc.Driver"); 
            Connection db = DriverManager.getConnection(urlDB,usernameDB,passwordDB);
            System.out.println("Successfully connected to DB");
            Statement state = db.createStatement();
            ResultSet rs = state.executeQuery(sqlquery);
            while(rs.next()){              
                booleano = "true";
                usuario = booleano;
            }          
            System.out.println("El usuario en validateUser es:" + usuario);
            return usuario;
        }catch(SQLException e){
            System.out.println("Error");
            e.printStackTrace();        
            booleano = "false";
            usuario += booleano;
            return usuario;
        }catch(ClassNotFoundException e){
            e.printStackTrace();
            booleano = "false";
            usuario += booleano;
            return usuario;
        }
    }
}


