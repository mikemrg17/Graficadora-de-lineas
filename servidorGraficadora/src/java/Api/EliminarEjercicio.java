package Api;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

/**
 *
 * @author miguel
 */

public class EliminarEjercicio extends HttpServlet {

    int row;
    private PrintWriter out;
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        out = response.getWriter();
        response.setContentType("application/json");
        response.addHeader("Access-Control-Allow-Origin", "*");
        StringBuilder json = new StringBuilder();
        
        String id = request.getParameter("idEjercicio");
        System.out.println("El id es:"+id);
        try {
            int contador=0;
            Class.forName("com.mysql.jdbc.Driver");
            Connection db = DriverManager.getConnection("jdbc:mysql://localhost/graficadoraDeLineas","miguel", "1234");
            Statement s = db.createStatement();
            //ResultSet rs = s.executeQuery("SELECT JSON_ARRAYAGG(JSON_OBJECT('idEjercicio', idEjercicio, 'x1', x1, 'y1', y1, 'x2', x2, 'y2', y2)) AS jsonE FROM ejercicios WHERE idUsuario = '"+idSolicitado+"';");
            ResultSet rs=s.executeQuery("SELECT idUsuario FROM ejercicios WHERE idEjercicio='"+id+"';");
            
            //JSONObject jsonObject = new JSONObject();
            
            String idUsuarioEliminado;
            while(rs.next()){
                idUsuarioEliminado = rs.getString("idUsuario");
                json.append(idUsuarioEliminado);
            }
            
            
            
            PreparedStatement statement = db.prepareStatement("DELETE FROM ejercicios WHERE idEjercicio = ?");
            statement.setString(1, id);
            row = statement.executeUpdate();
            out.write(json.toString());
        } catch (Exception ex) {
            System.out.println("No se pudo eliminar el registro");
            ex.printStackTrace();
        }
    }
}