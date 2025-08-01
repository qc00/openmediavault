/**
 * This file is part of OpenMediaVault.
 *
 * @license   https://www.gnu.org/licenses/gpl.html GPL Version 3
 * @author    Volker Theile <volker.theile@openmediavault.org>
 * @copyright Copyright (c) 2009-2025 Volker Theile
 *
 * OpenMediaVault is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * OpenMediaVault is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */
import { Component } from '@angular/core';
import { marker as gettext } from '@ngneat/transloco-keys-manager/marker';

import { FormPageConfig } from '~/app/core/components/intuition/models/form-page-config.type';
import { BaseFormPageComponent } from '~/app/pages/base-page-component';

@Component({
  template: '<omv-intuition-form-page [config]="this.config"></omv-intuition-form-page>'
})
export class InterfaceEthernetFormPageComponent extends BaseFormPageComponent {
  public config: FormPageConfig = {
    request: {
      service: 'Network',
      get: {
        method: 'getEthernetIface',
        params: {
          uuid: '{{ _routeParams.uuid }}'
        }
      },
      post: {
        method: 'setEthernetIface'
      }
    },
    fields: [
      {
        type: 'confObjUuid'
      },
      {
        type: 'select',
        name: 'type',
        label: gettext('Type'),
        disabled: true,
        submitValue: false,
        value: 'ethernet',
        store: {
          data: [
            ['ethernet', gettext('Ethernet')],
            ['bond', gettext('Bond')],
            ['vlan', gettext('VLAN')],
            ['wifi', gettext('Wi-Fi')],
            ['bridge', gettext('Bridge')]
          ]
        }
      },
      {
        type: 'select',
        name: 'devicename',
        label: gettext('Device'),
        placeholder: gettext('Select a device ...'),
        textField: 'description',
        valueField: 'devicename',
        store: {
          proxy: {
            service: 'Network',
            get: {
              method:
                '{{ "enumerateDevices" if _routeConfig.data.editing else "getEthernetCandidates" }}'
            }
          },
          sorters: [
            {
              dir: 'asc',
              prop: 'devicename'
            }
          ]
        },
        value: '',
        disabled: '{{ _routeConfig.data.editing | toboolean }}',
        validators: {
          required: true
        }
      },
      {
        type: 'tagInput',
        name: 'comment',
        label: gettext('Tags'),
        value: ''
      },
      {
        type: 'divider',
        title: gettext('IPv4')
      },
      {
        type: 'select',
        name: 'method',
        label: gettext('Method'),
        value: 'manual',
        store: {
          data: [
            ['manual', gettext('Disabled')],
            ['dhcp', gettext('DHCP')],
            ['static', gettext('Static')]
          ]
        },
        validators: {
          required: true
        }
      },
      {
        type: 'textInput',
        name: 'address',
        label: gettext('Address'),
        value: '',
        validators: {
          patternType: 'ipv4',
          requiredIf: { operator: 'eq', arg0: { prop: 'method' }, arg1: 'static' }
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'textInput',
        name: 'netmask',
        label: gettext('Netmask'),
        value: '',
        validators: {
          patternType: 'netmask',
          requiredIf: { operator: 'eq', arg0: { prop: 'method' }, arg1: 'static' }
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'container',
        fields: [
          {
            type: 'textInput',
            name: 'gateway',
            label: gettext('Gateway'),
            value: '',
            validators: {
              patternType: 'ipv4'
            },
            modifiers: [
              {
                type: 'disabled',
                constraint: { operator: 'ne', arg0: { prop: 'method' }, arg1: 'static' }
              }
            ]
          },
          {
            type: 'numberInput',
            name: 'routemetric',
            label: gettext('Metric'),
            value: 0,
            validators: {
              min: 0,
              max: 65535,
              patternType: 'integer'
            },
            modifiers: [
              {
                type: 'disabled',
                constraint: { operator: 'ne', arg0: { prop: 'method' }, arg1: 'static' }
              }
            ]
          }
        ]
      },
      {
        type: 'divider',
        title: gettext('IPv6')
      },
      {
        type: 'select',
        name: 'method6',
        label: gettext('Method'),
        value: 'manual',
        store: {
          data: [
            ['manual', gettext('Disabled')],
            ['dhcp', gettext('DHCP')],
            ['auto', gettext('Automatic')],
            ['static', gettext('Static')]
          ]
        },
        validators: {
          required: true
        }
      },
      {
        type: 'textInput',
        name: 'address6',
        label: gettext('Address'),
        value: '',
        validators: {
          patternType: 'ipv6',
          requiredIf: { operator: 'eq', arg0: { prop: 'method6' }, arg1: 'static' }
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method6' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'numberInput',
        name: 'netmask6',
        label: gettext('Prefix length'),
        value: 64,
        validators: {
          min: 0,
          max: 128,
          patternType: 'integer',
          requiredIf: { operator: 'eq', arg0: { prop: 'method6' }, arg1: 'static' }
        },
        modifiers: [
          {
            type: 'disabled',
            constraint: { operator: 'ne', arg0: { prop: 'method6' }, arg1: 'static' }
          }
        ]
      },
      {
        type: 'container',
        fields: [
          {
            type: 'textInput',
            name: 'gateway6',
            label: gettext('Gateway'),
            value: '',
            validators: {
              patternType: 'ipv6'
            },
            modifiers: [
              {
                type: 'disabled',
                constraint: { operator: 'ne', arg0: { prop: 'method6' }, arg1: 'static' }
              }
            ]
          },
          {
            type: 'numberInput',
            name: 'routemetric6',
            label: gettext('Metric'),
            value: 1,
            validators: {
              min: 0,
              max: 65535,
              patternType: 'integer'
            },
            modifiers: [
              {
                type: 'disabled',
                constraint: { operator: 'ne', arg0: { prop: 'method6' }, arg1: 'static' }
              }
            ]
          }
        ]
      },
      {
        type: 'divider',
        title: gettext('Advanced settings')
      },
      {
        type: 'textInput',
        name: 'altmacaddress',
        label: gettext('MAC address'),
        hint: gettext('Force a specific MAC address on this interface.'),
        value: '',
        validators: {
          patternType: 'macAddress'
        }
      },
      {
        type: 'textInput',
        name: 'dnsnameservers',
        label: gettext('DNS servers'),
        hint: gettext('IP addresses of domain name servers used to resolve host names.'),
        value: '',
        validators: {
          patternType: 'ipList',
          requiredIf: {
            operator: 'or',
            arg0: {
              operator: 'and',
              arg0: { operator: 'eq', arg0: { prop: 'method' }, arg1: 'static' },
              arg1: { operator: 'n', arg0: { prop: 'gateway' } }
            },
            arg1: {
              operator: 'and',
              arg0: { operator: 'eq', arg0: { prop: 'method6' }, arg1: 'static' },
              arg1: { operator: 'n', arg0: { prop: 'gateway6' } }
            }
          }
        }
      },
      {
        type: 'textInput',
        name: 'dnssearch',
        label: gettext('Search domains'),
        hint: gettext('Domains used when resolving host names.'),
        value: '',
        validators: {
          patternType: 'domainNameList'
        }
      },
      {
        type: 'numberInput',
        name: 'mtu',
        label: gettext('MTU'),
        hint: gettext(
          'The maximum transmission unit in bytes to set for the device. Set to 0 to use the default value.'
        ),
        value: 0,
        validators: {
          min: 0,
          max: 65535,
          patternType: 'integer'
        }
      },
      {
        type: 'checkbox',
        name: 'wol',
        label: gettext('Wake-on-LAN'),
        value: false
      }
    ],
    buttons: [
      {
        template: 'submit',
        execute: {
          type: 'url',
          url: '/network/interfaces'
        }
      },
      {
        template: 'cancel',
        execute: {
          type: 'url',
          url: '/network/interfaces'
        }
      }
    ]
  };
}
