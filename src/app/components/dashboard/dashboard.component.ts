import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ChampionsService } from 'src/app/shared/services/champions.service';
var waterfall = require('async-waterfall');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  groups_html;
  championship_groups_html;
  matches_groups_html = [];
  first_phase_html;
  next_phase_html;
  phase_count: number[] = [];
  next_phase_1_html: any[] = [];
  champion;
  teams;

  constructor(
    public authService: AuthService,
    public championsService: ChampionsService
  ) { }

  ngOnInit(): void {


    this.tournament();

  }

  tournament(): void {


    
    this.championsService.listDoc().subscribe(result => {

      this.teams = result;
      console.log('result = ', result);

    let groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    let championship = {
      groups: [
        {
          A: [
            {
              team: 'Uruguai',
              win_percent: 60,
              points: 0
            },
            {
              team: 'Rússia',
              win_percent: 5,
              points: 0
            },
            {
              team: 'Arábia Saudita',
              win_percent: 10,
              points: 0
            },
            {
              team: 'Egito',
              win_percent: 20,
              points: 0
            }
          ],
          B: [
            {
              team: 'Espanha',
              win_percent: 40,
              points: 0
            },
            {
              team: 'Portugal',
              win_percent: 10,
              points: 0
            },
            {
              team: 'Irã',
              win_percent: 25,
              points: 0
            },
            {
              team: 'Marrocos',
              win_percent: 20,
              points: 0
            }
          ],
          C: [
            {
              team: 'França',
              win_percent: 40,
              points: 0
            },
            {
              team: 'Dinamarca',
              win_percent: 10,
              points: 0
            },
            {
              team: 'Peru',
              win_percent: 25,
              points: 0
            },
            {
              team: 'Austrália',
              win_percent: 20,
              points: 0
            }
          ],
          D: [
            {
              team: 'Croácia',
              win_percent: 40,
              points: 0
            },
            {
              team: 'Argentina',
              win_percent: 10,
              points: 0
            },
            {
              team: 'Nigéria',
              win_percent: 25,
              points: 0
            },
            {
              team: 'Islândia',
              win_percent: 20,
              points: 0
            }
          ],
          E: [
            {
              team: 'Brasil',
              win_percent: 40,
              points: 0
            },
            {
              team: 'Suíça',
              win_percent: 10,
              points: 0
            },
            {
              team: 'Sérvia',
              win_percent: 25,
              points: 0
            },
            {
              team: 'Costa Rica',
              win_percent: 20,
              points: 0
            }
          ],
          F: [
            {
              team: 'Suécia',
              win_percent: 40,
              points: 0
            },
            {
              team: 'México',
              win_percent: 10,
              points: 0
            },
            {
              team: 'Coréia do Sul',
              win_percent: 25,
              points: 0
            },
            {
              team: 'Alemanha',
              win_percent: 20,
              points: 0
            }
          ],
          G: [
            {
              team: 'Bélgica',
              win_percent: 40,
              points: 0
            },
            {
              team: 'Inglaterra',
              win_percent: 10,
              points: 0
            },
            {
              team: 'Tunísia',
              win_percent: 25,
              points: 0
            },
            {
              team: 'Panamá',
              win_percent: 20,
              points: 0
            }
          ],
          H: [
            {
              team: 'Colômbia',
              win_percent: 40,
              points: 0
            },
            {
              team: 'Japão',
              win_percent: 10,
              points: 0
            },
            {
              team: 'Senegal',
              win_percent: 25,
              points: 0
            },
            {
              team: 'Polônia',
              win_percent: 20,
              points: 0
            }
          ]
        }
      ]
    };

    let matches = Array(), teams = Array(), what_is_group = '';


    championship['groups'].map(championship => {

      console.log(' || CAMPEONATO || ');

      groups.map(group => {

        console.log(' GRUPO: ', group);

        championship[group].map(team => {

          console.log(' EQUIPE: ', team['team'])

          if (what_is_group !== group) {
            teams = [];
          }

          teams.push(team['team']);

          teams.map(match => {

            if (String(team['team']) !== String(match)) {
              matches.push({
                team_a: team['team'],
                team_b: match,
                result_a: Math.floor(Math.random() * 6),
                result_b: Math.floor(Math.random() * 6),
                group: group
              });
            }

          });

          what_is_group = group;

        });


      });

    });

    console.log(' PARTIDAS: ');

    matches.map(match => {

      console.log(' PARTIDA: ', match);

      if (match['result_a'] > match['result_b']) {

        const team_a = championship['groups'][0][match['group']].find(item => String(match['team_a']) === String(item['team']));

        team_a['points'] = team_a['points'] + 3;

        console.log('A VENCEU');

      } else if (match['result_a'] < match['result_b']) {

        const team_b = championship['groups'][0][match['group']].find(item => String(match['team_b']) === String(item['team']));

        team_b['points'] = team_b['points'] + 3;

        console.log('B VENCEU');

      } else {

        const draw_a = championship['groups'][0][match['group']].find(item => String(match['team_a']) === String(item['team']));

        draw_a['points'] = draw_a['points'] + 1;

        const draw_b = championship['groups'][0][match['group']].find(item => String(match['team_b']) === String(item['team']));

        draw_b['points'] = draw_b['points'] + 1;

        console.log('EMPATE');

      }

    });

    groups.map(group => {
      this.matches_groups_html[group] = matches.filter(item => String(group) === String(item['group']));
    });

    console.log(' DDDD = ', this.matches_groups_html)

    console.log(' GERAL ', championship['groups'][0])

    let group_position = 0, first_placed = Array(), second_placed = Array();

    console.log(' GRUPOS CLASSIFICAÇÃO ')

    groups.map(group => {

      championship['groups'][0][group].sort((a, b) => (a['points'] < b['points']) ? 1 : ((b['points'] < a['points']) ? -1 : 0))

      console.log(group, ' = ', championship['groups'][0][group])

      championship['groups'][0][group].map(team => {

        group_position = group_position + 1;

        team['bg'] = 'white';

        if (group_position === 1) {
          first_placed.push({ team: team['team'] });
          team['bg'] = 'success';
        }

        if (group_position === 2) {
          second_placed.push({ team: team['team'] });
          team['bg'] = 'success';
        }

      });

      group_position = 0;

    });

    this.groups_html = groups;
    this.championship_groups_html = championship['groups'];

    let next_phase = Array(), placed_count = 0, row_count = 0, matches_count = 0, qm_aux_1 = Array(), qm_aux_2 = Array(), matches_next_phases_aux = Array();

    console.log(' CLASSIFICADOS ')

    console.log(' Primeiros colocados = ', first_placed)
    console.log(' Segundos colocados = ', second_placed)

    first_placed.map(fp => {

      placed_count = placed_count + 1;

      if (placed_count % 2 !== 0) {

        qm_aux_1[matches_count] = {
          team_a: fp['team'],
          team_b: second_placed[matches_count + 1]['team'],
          result_a: Math.floor(Math.random() * 6),
          result_b: Math.floor(Math.random() * 6),
          phase: 0
        };

      }

      if (placed_count % 2 === 0) {

        qm_aux_2[matches_count] = {
          team_a: fp['team'],
          team_b: second_placed[matches_count - 1]['team'],
          result_a: Math.floor(Math.random() * 6),
          result_b: Math.floor(Math.random() * 6),
          phase: 0
        };

      }

      matches_count = matches_count + 1;

    });

    next_phase = Object.assign(qm_aux_1, qm_aux_2);

    this.first_phase_html = next_phase;

    //matches_next_phases_aux = Object.assign(next_phase);

    console.log(' !!! == ', matches_next_phases_aux)
    console.log(' matches_count == ', matches_count)


    let count = next_phase.length, phases = 0;

    do {

      if (count % 2 == 0) {
        count = count / 2;
        phases = phases + 1;
      } else {
        break;
      }

    } while (true);

    console.log('Número de Fases = ', phases)

    let finals_oject = Array();

    let i = 0;
    for (i = 1; i <= phases; i++) {

      placed_count = 0, row_count = 0, finals_oject = [];

      this.phase_count.push(i);

      console.log('CLASSIFICADOS')

      next_phase.map(match => {

        placed_count = placed_count + 1;

        if (placed_count % 2 !== 0) {

          let win_1 = '', win_2 = '';

          console.log(' next_phase = ', next_phase)

          if (match['result_a'] > match['result_b']) {
            win_1 = match['team_a'];
          } else if (match['result_a'] < match['result_b']) {
            win_1 = match['team_b'];
          } else {
            win_1 = match['team_a'];
          }

          if (next_phase[row_count + 1]['result_a'] > next_phase[row_count + 1]['result_b']) {
            win_2 = next_phase[row_count + 1]['team_a'];
          } else if (next_phase[row_count + 1]['result_a'] < next_phase[row_count + 1]['result_b']) {
            win_2 = next_phase[row_count + 1]['team_b'];
          } else {
            win_2 = next_phase[row_count + 1]['team_a'];
          }

          let finals_object_aux = Array();

          finals_object_aux[matches_count] = {
            team_a: win_1,
            team_b: win_2,
            result_a: Math.floor(Math.random() * 6),
            result_b: Math.floor(Math.random() * 6),
            phase: i
          };

          console.log(' >> ', matches_count, ' = ', finals_object_aux)

          finals_oject.push(finals_object_aux[matches_count]);

          console.log(' finals_oject = ', finals_oject)

          matches_next_phases_aux.push(finals_object_aux[matches_count]);

          matches_count = matches_count + 1;

        }

        row_count = row_count + 1;
      });

      this.next_phase_1_html.push(finals_oject);

      next_phase = [];
      next_phase = finals_oject;

      console.log(' Partidas = ', finals_oject)

    }

    this.next_phase_html = matches_next_phases_aux;

    // CAMPEÃO
    if (this.next_phase_html[this.phase_count.length * (phases - 1)]['result_a'] > this.next_phase_html[this.phase_count.length * (phases - 1)]['result_b']) {
      this.champion = this.next_phase_html[this.phase_count.length * (phases - 1)]['team_a'];
    } else if (this.next_phase_html[this.phase_count.length * (phases - 1)]['result_a'] < this.next_phase_html[this.phase_count.length * (phases - 1)]['result_b']) {
      this.champion = this.next_phase_html[this.phase_count.length * (phases - 1)]['team_b'];
    } else {
      this.champion = this.next_phase_html[this.phase_count.length * (phases - 1)]['team_b'];
    }

    console.log(' Campeão ', this.champion)

    this.updateChampion();

  });

  }

  updateChampion(): void {

    console.log('ddd = ', this.teams)

    let team = this.teams.find(team => (String(team['id']) === String(this.champion)));
    let count = 0;

    if(team !== undefined){
      count = team['data']['count'];
    }

    console.log('champions = ', team)

    this.championsService.setChampionData( this.champion, count);

  }


}
