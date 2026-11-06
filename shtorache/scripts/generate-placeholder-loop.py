# Procedural, seamlessly-looping placeholder: stage beams through haze, B&W.
import numpy as np, sys
W,H,FPS,DUR=640,360,24,10
N=FPS*DUR
y,x=np.mgrid[0:H,0:W].astype(np.float32)
x/=W; y/=H
TAU=2*np.pi
def beam(t,ox,base,amp,ph,width):
    ang=base+amp*np.sin(TAU*t+ph)          # beam angle (radians from vertical)
    dx=x-ox; dy=y+0.08
    a=np.arctan2(dx,dy)
    d=np.abs(a-ang)
    core=np.exp(-(d/width)**2)
    fall=np.clip(1.15-y*0.9,0,1)
    return core*fall
rng=np.random.default_rng(3)
# smoke: sum of drifting sines, periodic in t
waves=[(rng.uniform(2,7),rng.uniform(1,5),rng.uniform(0,TAU),rng.integers(1,3)*rng.choice([-1,1]),rng.uniform(0,TAU)) for _ in range(9)]
vign=np.clip(1.25-1.6*np.sqrt((x-0.5)**2*1.2+(y-0.45)**2*1.6),0,1)**1.4
out=sys.stdout.buffer
for i in range(N):
    t=i/N
    s=np.zeros_like(x)
    for fx,fy,p,k,q in waves:
        s+=np.sin(TAU*(fx*x+k*t)+p+np.sin(TAU*(fy*y-t)+q))
    smoke=0.55+0.45*(s/len(waves))*2.2
    smoke=np.clip(smoke,0.15,1.3)
    b=(beam(t,0.28,0.26,0.12,0,0.09)+beam(t,0.72,-0.26,0.12,np.pi,0.09)+0.45*beam(t,0.5,0.0,0.07,np.pi/2,0.05))
    flick=1+0.06*np.sin(TAU*t*7)+0.04*np.sin(TAU*t*13)
    strobe=1+0.8*np.exp(-((t-0.62)*N/2.2)**2)   # one hit per loop
    img=(b*smoke*0.5*flick*strobe+0.04*smoke)*vign
    img=np.clip(img,0,1)**0.85
    out.write((img*255).astype(np.uint8).tobytes())
