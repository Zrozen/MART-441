(function($) {
    $.fn.highlightType = function(targetType) {
        const target = (targetType || "").toLowerCase().trim();
  
      const typeColors = {
        normal:   { bg: "#A8A77A", border: "#ff5733" },
        fire:     { bg: "#EE8130", border: "#00b8d4" },
        water:    { bg: "#6390F0", border: "#33cc33" },
        electric: { bg: "#F7D02C", border: "#ffcc00" },
        grass:    { bg: "#7AC74C", border: "#ec407a" },
        ice:      { bg: "#96D9D6", border: "#ff5733" },
        fighting: { bg: "#C22E28", border: "#00b8d4" },
        poison:   { bg: "#A33EA1", border: "#33cc33" },
        ground:   { bg: "#E2BF65", border: "#ffcc00" },
        flying:   { bg: "#A98FF3", border: "#ec407a" },
        psychic:  { bg: "#F95587", border: "#ff5733" },
        bug:      { bg: "#A6B91A", border: "#00b8d4" },
        rock:     { bg: "#B6A136", border: "#33cc33" },
        ghost:    { bg: "#735797", border: "#ffcc00" },
        dragon:   { bg: "#6F35FC", border: "#ec407a" },
        dark:     { bg: "#705746", border: "#00b8d4" },
        steel:    { bg: "#B7B7CE", border: "#33cc33" },
        fairy:    { bg: "#D685AD", border: "#ec407a" },
        default:  { bg: "#f0f0f0", border: "#999" }
      };
      return this.each(function() {
        const types = $(this).data("types")
          .toLowerCase()
          .split(",")
          .map(type => type.trim());
  
        if (types.includes(target)) {
          const colors = typeColors[target] || typeColors.default;
          $(this).css({
            backgroundColor: colors.bg,
            borderColor: colors.border
          });
           
        
        }
      });
    };
  })(jQuery);
  
     
  
  $(document).ready(function () {
    $.getJSON('data/data.json', function (data) {
      const pokemons = data.pokemon;
  
      pokemons.forEach(poke => {
        const types = poke.type.join(", ");
        const pokeCard = $(`
          <div class="user-card" data-types="${types}">
            <h3>${poke.name} (#${poke.num})</h3>
            <img src="${poke.img}" alt="${poke.name}" width="100">
            <p>Type: ${types}</p>
          </div>
        `);
        $('#user-list').append(pokeCard);
      });
  
      
      $('#highlight-btn').on('click', function () {
        const inputType = $('#type-search').val().trim();
        $('.user-card').css({
          backgroundColor: '',
          borderColor: ''
        });
        if (inputType) {
          $('.user-card').highlightType(inputType);
        }
      });
  
      
      $('#type-search').on('keypress', function (e) {
        if (e.which === 13) {
          $('#highlight-btn').click();
        }
      });
  
    }).fail(function () {
      $('#user-list').html('<p>Failed to load Pokémon data.</p>');
    });
  });
  