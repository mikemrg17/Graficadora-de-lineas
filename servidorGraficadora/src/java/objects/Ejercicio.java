/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package objects;

/**
 *
 * @author miguel
 */
public class Ejercicio {
    private int idEjercicio;
    private float x1 = 0.0f;
    private float y1 = 0.0f;
    private float x2 = 0.0f;
    private float y2 = 0.0f;

    public Ejercicio(float x1, float y1, float x2, float y2){
        this.x1 = x1;
        this.y1 = x1;
        this.x2 = x2;
        this.y2 = y2;
    }
    
    public int getIdEjercicio(){
        return idEjercicio;
    }
    
    public float getX1() {
        return x1;
    }

    public void setX1(float x1) {
        this.x1 = x1;
    }

    public float getY1() {
        return y1;
    }

    public void setY1(float y1) {
        this.y1 = y1;
    }

    public float getX2() {
        return x2;
    }

    public void setX2(float x2) {
        this.x2 = x2;
    }

    public float getY2() {
        return y2;
    }

    public void setY2(float y2) {
        this.y2 = y2;
    }
    
    
    
}
