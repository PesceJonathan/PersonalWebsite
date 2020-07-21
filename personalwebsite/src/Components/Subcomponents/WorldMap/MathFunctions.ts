export class MathFunctions {
    private static to_radians = Math.PI / 180;
    private static to_degrees = 180 / Math.PI;


    // cross product of two vectors v0&v1
    static cross(v0: number[], v1: number[]): number[] {
        return [v0[1] * v1[2] - v0[2] * v1[1], v0[2] * v1[0] - v0[0] * v1[2], v0[0] * v1[1] - v0[1] * v1[0]];
    }

    // dot product of two vectors v0&v1
    static dot(v0: number[], v1: number[]): number {
        for (var i = 0, sum = 0; v0.length > i; ++i) sum += v0[i] * v1[i];
        return sum;
    }

    // This function converts a [lon, lat] coordinates into a [x,y,z] coordinate 
    // the [x, y, z] is Cartesian, with origin at lon/lat (0,0) center of the earth
    static lonlat2xyz( coord: number[] ): number[] {

        var lon = coord[0] * this.to_radians;
        var lat = coord[1] * this.to_radians;

        var x = Math.cos(lat) * Math.cos(lon);

        var y = Math.cos(lat) * Math.sin(lon);

        var z = Math.sin(lat);

        return [x, y, z];
    }

    // This function computes a quaternion representation for the rotation between to vectors
    // https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
    static quaternion(v0: number[], v1: number[]): number[] | undefined   {

        if (v0 && v1) {
            
            var w = this.cross(v0, v1),  // vector pendicular to v0 & v1
                w_len = Math.sqrt(this.dot(w, w)); // length of w     

            if (w_len == 0)
                return;

            let theta = .5 * Math.acos(Math.max(-1, Math.min(1, this.dot(v0, v1))));
            let qi  = w[2] * Math.sin(theta) / w_len; 
            let qj  = - w[1] * Math.sin(theta) / w_len; 
            let qk  = w[0]* Math.sin(theta) / w_len;
            let qr  = Math.cos(theta);

            // return theta && [qr, qi, qj, qk];
            return [qr, qi, qj, qk];
        }
    }

    // This functions converts euler angles to quaternion
    // https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
    static euler2quat(e: number[]): number[] | undefined {
        if(!e) return;
        
        var roll = .5 * e[0] * this.to_radians,
            pitch = .5 * e[1] * this.to_radians,
            yaw = .5 * e[2] * this.to_radians,

            sr = Math.sin(roll),
            cr = Math.cos(roll),
            sp = Math.sin(pitch),
            cp = Math.cos(pitch),
            sy = Math.sin(yaw),
            cy = Math.cos(yaw),

            qi = sr*cp*cy - cr*sp*sy,
            qj = cr*sp*cy + sr*cp*sy,
            qk = cr*cp*sy - sr*sp*cy,
            qr = cr*cp*cy + sr*sp*sy;

        return [qr, qi, qj, qk];
    }

    // This functions computes a quaternion multiply
    // Geometrically, it means combining two quant rotations
    // http://www.euclideanspace.com/maths/algebra/realNormedAlgebra/quaternions/arithmetic/index.htm
    static quatMultiply(q1: number[], q2: number[]): number[] | undefined {
        if(!q1 || !q2) return;

        var a = q1[0],
            b = q1[1],
            c = q1[2],
            d = q1[3],
            e = q2[0],
            f = q2[1],
            g = q2[2],
            h = q2[3];

        return [
        a*e - b*f - c*g - d*h,
        b*e + a*f + c*h - d*g,
        a*g - b*h + c*e + d*f,
        a*h + b*g - c*f + d*e
        ];
    }

    // This function computes quaternion to euler angles
    // https://en.wikipedia.org/wiki/Rotation_formalisms_in_three_dimensions#Euler_angles_.E2.86.94_Quaternion
    static quat2euler(t: number[]): number[] | undefined {

        if(!t) return;

        return [ Math.atan2(2 * (t[0] * t[1] + t[2] * t[3]), 1 - 2 * (t[1] * t[1] + t[2] * t[2])) * this.to_degrees, 
                Math.asin(Math.max(-1, Math.min(1, 2 * (t[0] * t[2] - t[3] * t[1])))) * this.to_degrees, 
                Math.atan2(2 * (t[0] * t[3] + t[1] * t[2]), 1 - 2 * (t[2] * t[2] + t[3] * t[3])) * this.to_degrees
                ]
    }

    /*  This function computes the euler angles when given two vectors, and a rotation
        This is really the only math function called with d3 code.

        v0 - starting pos in lon/lat, commonly obtained by projection.invert
        v1 - ending pos in lon/lat, commonly obtained by projection.invert
        o0 - the projection rotation in euler angles at starting pos (v0), commonly obtained by projection.rotate
    */
    public static eulerAngles(v0: number[], v1: number[], o0: number[]): number[] {

        /*
            The math behind this:
            - first calculate the quaternion rotation between the two vectors, v0 & v1
            - then multiply this rotation onto the original rotation at v0
            - finally convert the resulted quat angle back to euler angles for d3 to rotate
        */

        var t = this.quatMultiply(this.euler2quat(o0) as number[], this.quaternion(this.lonlat2xyz(v0), this.lonlat2xyz(v1) ) as number[] );
        return this.quat2euler(t as number[]) as number[];	
    }
    /**************end of math functions**********************/
}

interface IMathFunctions {
    eulerAngles: (v0: number[], v1: number[], o0: number[]) => number[]
}