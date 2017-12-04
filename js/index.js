$(window).on('load', function () {
  var field = [[],[],[]], c = ['X', 'O'], i = 0, g = true, m = "s1";
  var w = [
    [[0,0],[0,1],[0,2]],
    [[1,0],[1,1],[1,2]],
    [[2,0],[2,1],[2,2]],
    [[0,0],[1,0],[2,0]],
    [[0,1],[1,1],[2,1]],
    [[0,2],[1,2],[2,2]],
    [[0,0],[1,1],[2,2]],
    [[0,2],[1,1],[2,0]],
  ];
  
  function won (c, d) {
    var i = 0;
    while (i < 8) {
      let a1 = field[w[i][0][0]][w[i][0][1]];
      let a2 = field[w[i][1][0]][w[i][1][1]];
      let a3 = field[w[i][2][0]][w[i][2][1]];
      if ((a1 === c && a2 === c && a3 === c) ||
          (d === "") &&
          (a1 === c || a1 === d) &&
          (a2 === c || a2 === d) &&
          (a3 === c || a3 === d)
         ) {
        return true;
      }
      i++;
    }
    return false;
  };
  
  function set (id) {
    if (g) {
      let a = id, d;
      let x = parseInt(a.substr(0,1));
      let y = parseInt(a.substr(1,1));

      if (field[x][y] === "") {
        d = c[i];
        field[x][y] = d;
        $("#"+a).text(d);
        if (won(d)) {
          g = false;
          alert("WON " + d);
        }
        else {
          if (g && !won(d, "")) {
            g = false;
            alert("NONE " + d);
          }
        }
        i ^= 1;
        d = c[i];
        if (g && !won(d, "")) {
          g = false;
          alert("NONE " + d);
        }
      }
    }
  };
  
  function clear () {
    let x = 0, y;
    while (x < 3) {
      y = 0;
      while (y < 3) {
        field[x][y] = "";
        $("#"+x+y).text("");
        y++;
      }
      x++;
    }
  }
  
  function comp () {
    let fields = [];
    let i, x = 0, y;
    while (x < 3) {
      y = 0;
      while (y < 3) {
        if (field[x][y] === "") {
          fields.push(""+x+y);
        }
        y++;
      }
      x++;
    }
    if (fields.length > 0) {
      i = Math.floor(Math.random() * fields.length);
      set(fields[i]);
    }
  }
  
  function sel () {
    m = $(this).find('option:selected')[0].id;
  }
  
  function start () {
    clear();
    g = true;
    i = 0;
    if (m === "s3") {
      setTimeout(next, 1000);
    }
  };
  
  function next () {
    if (m === "s1") {
      set(this.id);
    }
    else if (m === "s2") {
      set(this.id);
      comp();
    }
    else {
      comp();
      if (g) {
        setTimeout(next, 1000);
      }
    }
  };

  $("#ch").change(sel);
  $("#start").click(start);
  $("td").click(next);

  start();
});