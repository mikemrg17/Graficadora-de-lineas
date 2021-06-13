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
    
    private PrintWriter out;

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        out = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        StringBuilder json = new StringBuilder();
        
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
        
        //Validacion de usuario
        String res = validateUser(email,password);
        System.out.println("La cadena es:" + res);
        //Declaracion de un subcadena
        String[] partres = res.split(",");   
        System.out.println("La cadena separada 1 es:" + partres[0]);
        System.out.println("La cadena separada 2 es:" + partres[1]);
        System.out.println("La cadena separada 3 es:" + partres[2]);
        
        //try {
            if(partres[2].equals("false")){
                json.append(res);
                
                System.out.println("El json a enviar es:"+json.toString());
                out.write(json.toString());
                
            }else { 
                json.append(res);  
                System.out.println("El json a enviar es:"+json.toString());
                out.write(json.toString());           
            }
        /*} catch (Exception ex) {
            System.out.println("No se pudo iniciar sesion, intentelo mas tarde");
            ex.printStackTrace();
        }*/
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


    public String validateUser (String emailToValidate, String passwordToValidate){

        String urlDB = "jdbc:mysql://localhost/graficadoraDeLineas";
        String usernameDB = "miguel";
        String passwordDB = "1234";
        String sqlquery = "select * from usuarios where email='" + emailToValidate + "' and " + "password='" + passwordToValidate + "'";
        String usuario = "";
        String booleano = "";
        try{
            Class.forName("com.mysql.jdbc.Driver"); 
            Connection db = DriverManager.getConnection(urlDB,usernameDB,passwordDB);
            System.out.println("Successfully connected to DB");
            Statement state = db.createStatement();
            ResultSet rs = state.executeQuery(sqlquery);
            while(rs.next()){
                int idUsuario = rs.getInt("idUsuario");               
                int rolUsuario = rs.getInt("idRol");
                booleano = "true";
                usuario = idUsuario + "," + rolUsuario + "," + booleano;
            }          
            //System.out.println("Usuario " + rs.getString(2) + " encontrado!");
            db.close();
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
